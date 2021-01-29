//found a match? it's greedy? keep going!
exports.getGreedy = function (state, reg, until, index) {
  let start = state.t
  for (; state.t < state.terms.length; state.t += 1) {
    //stop for next-reg match
    if (until && state.terms[state.t].doesMatch(until, index + state.t, state.length)) {
      return state.t
    }
    let count = state.t - start + 1
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return state.t
    }
    //stop here
    if (state.terms[state.t].doesMatch(reg, index + state.t, state.length) === false) {
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
exports.greedyTo = function (state, nextReg, index) {
  let t = state.t
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return state.terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < state.terms.length; t += 1) {
    if (state.terms[t].doesMatch(nextReg, index + t, state.length) === true) {
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
exports.isEndGreedy = function (reg, index, state) {
  if (reg.end === true && reg.greedy === true) {
    if (index + state.t < state.length - 1) {
      let tmpReg = Object.assign({}, reg, { end: false })
      if (state.terms[state.t].doesMatch(tmpReg, index + state.t, state.length) === true) {
        return true
      }
    }
  }
  if (state.terms[state.t].doesMatch(reg, index + state.t, state.length) === true) {
    return true
  }
  return false
}

// get or create named group
exports.getOrCreateGroup = function (namedGroups, namedGroupId, terms, startIndex, group) {
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

exports.doMultiWord = function (state, reg) {
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
        if (state.terms[tryTerm].doesMatch({ word: w }, tryTerm, state.length)) {
          return true
        }
        return false
      })
      if (found) {
        return cr.sequence.length
      }
    } else if (state.terms[state.t].doesMatch(cr, state.t, state.length)) {
      // try a normal match in a multiword
      return 1
    }
  }
  return false
}
