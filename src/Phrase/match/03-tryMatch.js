const makeId = require('../../Term/_id')
// i formally apologize for how complicated this is.

//found a match? it's greedy? keep going!
const getGreedy = function (terms, t, reg, until, index, length) {
  let start = t
  for (; t < terms.length; t += 1) {
    //stop for next-reg match
    if (until && terms[t].doesMatch(until, index + t, length)) {
      return t
    }
    let count = t - start + 1
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return t
    }
    //stop here
    if (terms[t].doesMatch(reg, index + t, length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null
      }
      return t
    }
  }
  return t
}

//'unspecific greedy' is a weird situation.
const greedyTo = function (terms, t, nextReg, index, length) {
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < terms.length; t += 1) {
    if (terms[t].doesMatch(nextReg, index + t, length) === true) {
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
}

//we have a special case where an end-anchored greedy match may need to
//start matching before the actual end; we do this by (temporarily!)
//removing the "end" property from the matching token... since this is
//very situation-specific, we *only* do this when we really need to.
const isEndGreedy = function (reg, index, t, terms, length) {
  if (reg.end === true && reg.greedy === true) {
    if (index + t < length - 1) {
      let tmpReg = Object.assign({}, reg, { end: false })
      if (terms[t].doesMatch(tmpReg, index + t, length) === true) {
        return true
      }
    }
  }
  if (terms[t].doesMatch(reg, index + t, length) === true) {
    return true
  }
  return false
}

// get or create named group
const getOrCreateGroup = function (namedGroups, namedGroupId, terms, startIndex, group) {
  if (namedGroups[namedGroupId]) {
    return namedGroups[namedGroupId]
  }
  const { id } = terms[startIndex]
  namedGroups[namedGroupId] = {
    group: String(group),
    start: id,
    length: 0,
  }
  return namedGroups[namedGroupId]
}

/** tries to match a sequence of terms, starting from here */
const tryHere = function (terms, regs, index, length) {
  const namedGroups = {}
  let previousGroupId = null
  let t = 0

  // we must satisfy each rule in 'regs'
  for (let r = 0; r < regs.length; r += 1) {
    let reg = regs[r]

    // Check if this reg has a named capture group
    const isNamedGroup = typeof reg.named === 'string' || typeof reg.named === 'number'
    let namedGroupId = null

    // Reuse previous capture group if same
    if (isNamedGroup) {
      const prev = regs[r - 1]
      if (prev && prev.named === reg.named && previousGroupId) {
        namedGroupId = previousGroupId
      } else {
        namedGroupId = makeId(reg.named)
        previousGroupId = namedGroupId
      }
    }
    //should we fail here?
    if (!terms[t]) {
      //are all remaining regs optional?
      const hasNeeds = regs.slice(r).some(remain => !remain.optional)
      if (hasNeeds === false) {
        break
      }
      // have unmet needs
      return [false, null]
    }

    //support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let skipto = greedyTo(terms, t, regs[r + 1], reg, index, length)
      // ensure it's long enough
      if (reg.min !== undefined && skipto - t < reg.min) {
        return [false, null]
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - t > reg.max) {
        t = t + reg.max
        continue
      }

      if (skipto === null) {
        return [false, null] //couldn't find it
      }

      // is it really this easy?....
      if (isNamedGroup) {
        const g = getOrCreateGroup(namedGroups, namedGroupId, terms, t, reg.named)

        // Update group
        g.length = skipto - t
      }

      t = skipto

      continue
    }
    //if it looks like a match, continue

    if (reg.anything === true || isEndGreedy(reg, index, t, terms, length)) {
      let startAt = t
      // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?
      if (reg.optional && regs[r + 1]) {
        // does the next reg match it too?
        if (terms[t].doesMatch(regs[r + 1], index + t, length) === true) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          if (!terms[t + 1] || terms[t + 1].doesMatch(regs[r + 1], index + t, length) === false) {
            r += 1
          }
        }
      }
      //advance to the next term!
      t += 1
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (t !== terms.length && reg.greedy !== true) {
          return [false, null]
        }
      }

      //try keep it going!
      if (reg.greedy === true) {
        // for greedy checking, we no longer care about the reg.start
        // value, and leaving it can cause failures for anchored greedy
        // matches.  ditto for end-greedy matches: we need an earlier non-
        // ending match to succceed until we get to the actual end.
        t = getGreedy(terms, t, Object.assign({}, reg, { start: false, end: false }), regs[r + 1], index, length)
        if (t === null) {
          return [false, null] //greedy was too short
        }
        if (reg.min && reg.min > t) {
          return [false, null] //greedy was too short
        }
        // if this was also an end-anchor match, check to see we really
        // reached the end
        if (reg.end === true && index + t !== length) {
          return [false, null] //greedy didn't reach the end
        }
      }
      if (isNamedGroup) {
        // Get or create capture group
        const g = getOrCreateGroup(namedGroups, namedGroupId, terms, startAt, reg.named)

        // Update group - add greedy or increment length
        if (t > 1 && reg.greedy) {
          g.length += t - startAt
        } else {
          g.length++
        }
      }
      continue
    }

    //bah, who cares, keep going
    if (reg.optional === true) {
      continue
    }
    // should we skip-over an implicit word?
    if (terms[t].isImplicit() && regs[r - 1] && terms[t + 1]) {
      // does the next one match?
      if (terms[t + 1].doesMatch(reg, index + t, length)) {
        t += 2
        continue
      }
    }

    // console.log('   ❌\n\n')
    return [false, null]
  }

  //return our result
  return [terms.slice(0, t), namedGroups]
}
module.exports = tryHere
