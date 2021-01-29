const makeId = require('../../Term/_id')
const logic = require('./_match-logic')
// i formally apologize for how complicated this is.

/** tries to match a sequence of terms, starting from here */
const tryHere = function (terms, regs, index, length) {
  let state = {
    groups: {},
    t: 0,
    terms: terms,
    regs: regs,
  }
  let previousGroupId = null

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
    if (!state.terms[state.t]) {
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
      let skipto = logic.greedyTo(state.terms, state.t, regs[r + 1], reg, index, length)
      // ensure it's long enough
      if (reg.min !== undefined && skipto - state.t < reg.min) {
        return [false, null]
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - state.t > reg.max) {
        state.t = state.t + reg.max
        continue
      }

      if (skipto === null) {
        return [false, null] //couldn't find it
      }

      // is it really this easy?....
      if (isNamedGroup) {
        const g = logic.getOrCreateGroup(state.groups, namedGroupId, state.terms, state.t, reg.named)

        // Update group
        g.length = skipto - state.t
      }

      state.t = skipto

      continue
    }
    //if it looks like a match, continue

    // try to support (a|b|foo bar)
    if (reg.multiword === true) {
      let skipNum = logic.doMultiWord(state.terms, state.t, reg, length)
      if (skipNum) {
        const g = logic.getOrCreateGroup(state.groups, namedGroupId, state.terms, state.t, reg.named)
        g.length += skipNum
        state.t += skipNum
        continue
      } else if (!reg.optional) {
        return [false, null]
      }
    }

    if (reg.anything === true || logic.isEndGreedy(reg, index, state.t, state.terms, length)) {
      let startAt = state.t
      // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?
      if (reg.optional && regs[r + 1]) {
        // does the next reg match it too?
        if (state.terms[state.t].doesMatch(regs[r + 1], index + state.t, length) === true) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          if (
            !state.terms[state.t + 1] ||
            state.terms[state.t + 1].doesMatch(regs[r + 1], index + state.t, length) === false
          ) {
            r += 1
          }
        }
      }
      //advance to the next term!
      state.t += 1
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (state.t !== state.terms.length && reg.greedy !== true) {
          return [false, null]
        }
      }

      //try keep it going!
      if (reg.greedy === true) {
        // for greedy checking, we no longer care about the reg.start
        // value, and leaving it can cause failures for anchored greedy
        // matches.  ditto for end-greedy matches: we need an earlier non-
        // ending match to succceed until we get to the actual end.
        state.t = logic.getGreedy(
          state.terms,
          state.t,
          Object.assign({}, reg, { start: false, end: false }),
          regs[r + 1],
          index,
          length
        )
        if (state.t === null) {
          return [false, null] //greedy was too short
        }
        if (reg.min && reg.min > state.t) {
          return [false, null] //greedy was too short
        }
        // if this was also an end-anchor match, check to see we really
        // reached the end
        if (reg.end === true && index + state.t !== length) {
          return [false, null] //greedy didn't reach the end
        }
      }

      if (isNamedGroup) {
        // Get or create capture group
        const g = logic.getOrCreateGroup(state.groups, namedGroupId, state.terms, startAt, reg.named)

        // Update group - add greedy or increment length
        if (state.t > 1 && reg.greedy) {
          g.length += state.t - startAt
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
    if (state.terms[state.t].isImplicit() && regs[r - 1] && state.terms[state.t + 1]) {
      // does the next one match?
      if (state.terms[state.t + 1].doesMatch(reg, index + state.t, length)) {
        state.t += 2
        continue
      }
    }

    // console.log('   ❌\n\n')
    return [false, null]
  }

  //return our result
  return [state.terms.slice(0, state.t), state.groups]
}
module.exports = tryHere
