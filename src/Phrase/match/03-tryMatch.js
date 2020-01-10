// i formally apologize for how complicated this is.

//found a match? it's greedy? keep going!
const getGreedy = function(terms, t, reg, until, index, length) {
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
const greedyTo = function(terms, t, nextReg, index, length) {
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

/** tries to match a sequence of terms, starting from here */
const tryHere = function(terms, regs, index, length) {
  let captures = []
  let t = 0
  // we must satisfy each rule in 'regs'
  for (let r = 0; r < regs.length; r += 1) {
    let reg = regs[r]

    //should we fail here?
    if (!terms[t]) {
      //are all remaining regs optional?
      const hasNeeds = regs.slice(r).some(remain => !remain.optional)
      if (hasNeeds === false) {
        break
      }
      // have unmet needs
      return false
    }

    //support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let skipto = greedyTo(terms, t, regs[r + 1], reg, index, length)
      // ensure it's long enough
      if (reg.min !== undefined && skipto - t < reg.min) {
        return false
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - t > reg.max) {
        t = t + reg.max
        continue
      }
      //TODO: support [*] properly
      if (skipto === null) {
        return false //couldn't find it
      }
      t = skipto
      continue
    }

    //if it looks like a match, continue
    //we have a special case where an end-anchored greedy match may need to
    //start matching before the actual end; we do this by (temporarily!)
    //removing the "end" property from the matching token... since this is
    //very situation-specific, we *only* do this when we really need to.
    if (
      reg.anything === true ||
      (reg.end === true &&
        reg.greedy === true &&
        index + t < length - 1 &&
        terms[t].doesMatch(Object.assign({}, reg, { end: false }), index + t, length) === true) ||
      terms[t].doesMatch(reg, index + t, length) === true
    ) {
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
          return false
        }
      }

      // Add capture group name so we can grab it in matchAll
      if (typeof reg.capture === 'string' || typeof reg.capture === 'number') {
        terms[t - 1].group = reg.capture
      }

      //try keep it going!
      if (reg.greedy === true) {
        // for greedy checking, we no longer care about the reg.start
        // value, and leaving it can cause failures for anchored greedy
        // matches.  ditto for end-greedy matches: we need an earlier non-
        // ending match to succceed until we get to the actual end.
        const oldT = t
        t = getGreedy(terms, t, Object.assign({}, reg, { start: false, end: false }), regs[r + 1], index, length)
        if (t === null) {
          return false //greedy was too short
        }
        // if this was also an end-anchor match, check to see we really
        // reached the end
        if (reg.end === true && index + t !== length) {
          return false //greedy didn't reach the end
        }

        // Add capture group name to terms we missed
        if (typeof reg.capture === 'string' || typeof reg.capture === 'number') {
          for (let j = oldT; j < t; j++) {
            terms[j].group = reg.capture
          }
        }
      }
      if (reg.capture || typeof reg.capture === 'number') {
        captures.push(startAt)
        //add greedy-end to capture
        if (t > 1 && reg.greedy) {
          captures.push(t - 1)
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
    return false
  }

  //we got to the end of the regs, and haven't failed!
  //try to only return our [captured] segment
  if (captures.length > 0) {
    //make sure the array is the full-length we'd return anyways
    let arr = terms.slice(captures[0], captures[captures.length - 1] + 1)
    //make sure the array is t-length (so we skip ahead full-length)
    for (let tmp = 0; tmp < t; tmp++) {
      arr[tmp] = arr[tmp] || null //these get cleaned-up after
    }
    return arr
  }
  //return our result
  return terms.slice(0, t)
}
module.exports = tryHere
