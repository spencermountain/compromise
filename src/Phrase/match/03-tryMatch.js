const makeId = require('../../Term/_id')
const logic = require('./_match-logic')
// i formally apologize for how complicated this is.

/** tries to match a sequence of terms, starting from here */
const tryHere = function (terms, regs, index, length) {
  // all the variables that matter
  let state = {
    t: 0,
    terms: terms,
    regs: regs,
    groups: {}, //all named-group matches
    index: index, //sentence index we're starting from
    length: length, //phrase length
    groupId: null,
    previousGroup: null,
    r: 0,
  }

  // we must satisfy each rule in 'regs'
  for (; state.r < regs.length; state.r += 1) {
    let reg = regs[state.r]

    // Check if this reg has a named capture group
    const isNamedGroup = typeof reg.named === 'string' || typeof reg.named === 'number'

    // Reuse previous capture group if same
    if (isNamedGroup) {
      const prev = regs[state.r - 1]
      if (prev && prev.named === reg.named && state.previousGroup) {
        state.groupId = state.previousGroup
      } else {
        state.groupId = makeId(reg.named)
        state.previousGroup = state.groupId
      }
    }
    //should we fail here?
    if (!state.terms[state.t]) {
      //are all remaining regs optional?
      const hasNeeds = regs.slice(state.r).some(remain => !remain.optional)
      if (hasNeeds === false) {
        break
      }
      // have unmet needs
      return null
    }

    //support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let skipto = logic.greedyTo(state, regs[state.r + 1])
      // ensure it's long enough
      if (reg.min !== undefined && skipto - state.t < reg.min) {
        return null
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - state.t > reg.max) {
        state.t = state.t + reg.max
        continue
      }

      if (skipto === null) {
        return null //couldn't find it
      }

      // is it really this easy?....
      if (isNamedGroup) {
        const g = logic.getOrCreateGroup(state, state.t, reg.named)
        g.length = skipto - state.t
      }

      state.t = skipto

      continue
    }
    //if it looks like a match, continue

    // try to support (a|b|foo bar)
    if (reg.multiword === true) {
      let skipNum = logic.doMultiWord(state, reg)
      if (skipNum) {
        const g = logic.getOrCreateGroup(state, state.t, reg.named)
        g.length += skipNum
        state.t += skipNum
        continue
      } else if (!reg.optional) {
        return null
      }
    }

    if (reg.anything === true || logic.isEndGreedy(reg, state)) {
      let startAt = state.t
      // okay, it was a match, but if it optional too,
      // we should check the next reg too, to skip it?
      if (reg.optional && regs[state.r + 1]) {
        // does the next reg match it too?
        if (state.terms[state.t].doesMatch(regs[state.r + 1], state.index + state.t, state.length)) {
          // but does the next reg match the next term??
          // only skip if it doesn't
          if (
            !state.terms[state.t + 1] ||
            !state.terms[state.t + 1].doesMatch(regs[state.r + 1], state.index + state.t, state.length)
          ) {
            state.r += 1
          }
        }
      }
      //advance to the next term!
      state.t += 1
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (state.t !== state.terms.length && reg.greedy !== true) {
          return null //die
        }
      }

      //try keep it going!
      if (reg.greedy === true) {
        state.t = logic.getGreedy(state, regs[state.r + 1])
        if (state.t === null) {
          return null //greedy was too short
        }
        if (reg.min && reg.min > state.t) {
          return null //greedy was too short
        }
        // if this was also an end-anchor match, check to see we really
        // reached the end
        if (reg.end === true && state.index + state.t !== length) {
          return null //greedy didn't reach the end
        }
      }

      if (isNamedGroup) {
        // Get or create capture group
        const g = logic.getOrCreateGroup(state, startAt, reg.named)
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
    if (state.terms[state.t].isImplicit() && regs[state.r - 1] && state.terms[state.t + 1]) {
      // does the next one match?
      if (state.terms[state.t + 1].doesMatch(reg, state.index + state.t, length)) {
        state.t += 2
        continue
      }
    }
    return null //die
  }

  //return our result
  return { match: state.terms.slice(0, state.t), groups: state.groups }
}
module.exports = tryHere
