//found a match? it's greedy? keep going!
exports.getGreedy = function (state, endReg) {
  // for greedy checking, we no longer care about the reg.start
  // value, and leaving it can cause failures for anchored greedy
  // matches.  ditto for end-greedy matches: we need an earlier non-
  // ending match to succceed until we get to the actual end.
  let reg = Object.assign({}, state.regs[state.r], { start: false, end: false })
  let start = state.t
  for (; state.t < state.terms.length; state.t += 1) {
    //stop for next-reg match
    if (endReg && state.terms[state.t].doesMatch(endReg, state.start_i + state.t, state.phrase_length)) {
      return state.t
    }
    let count = state.t - start + 1
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return state.t
    }
    //stop here
    if (state.terms[state.t].doesMatch(reg, state.start_i + state.t, state.phrase_length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null
      }
      return state.t
    }
  }
  return state.t
}

//'unspecific greedy' is a weird situation.
exports.greedyTo = function (state, nextReg) {
  let t = state.t
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return state.terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < state.terms.length; t += 1) {
    if (state.terms[t].doesMatch(nextReg, state.start_i + t, state.phrase_length) === true) {
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
exports.isEndGreedy = function (reg, state) {
  if (reg.end === true && reg.greedy === true) {
    if (state.start_i + state.t < state.phrase_length - 1) {
      let tmpReg = Object.assign({}, reg, { end: false })
      if (state.terms[state.t].doesMatch(tmpReg, state.start_i + state.t, state.phrase_length) === true) {
        return true
      }
    }
  }
  if (state.terms[state.t].doesMatch(reg, state.start_i + state.t, state.phrase_length) === true) {
    return true
  }
  return false
}

// match multiword OR cases like (a|b|foo bar)
exports.doMultiWord = function (state) {
  let reg = state.regs[state.r]
  // do each multiword sequence
  for (let c = 0; c < reg.choices.length; c += 1) {
    let cr = reg.choices[c]
    // try a list of words
    if (cr.sequence) {
      let found = cr.sequence.every((w, w_index) => {
        let tryTerm = state.t + w_index
        if (state.terms[tryTerm] === undefined) {
          return false
        }
        if (state.terms[tryTerm].doesMatch({ word: w }, tryTerm, state.phrase_length)) {
          return true
        }
        return false
      })
      if (found) {
        return cr.sequence.length
      }
    } else if (state.terms[state.t].doesMatch(cr, state.t, state.phrase_length)) {
      // try a normal match in a multiword
      return 1
    }
  }
  return false
}

// get or create named group
exports.getGroup = function (state, term_index, name) {
  if (state.groups[state.groupId]) {
    return state.groups[state.groupId]
  }
  const termId = state.terms[term_index].id
  state.groups[state.groupId] = {
    group: String(name),
    start: termId,
    length: 0,
  }
  return state.groups[state.groupId]
}
