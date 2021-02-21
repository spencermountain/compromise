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

// match complex OR cases like (a|b|foo bar)
exports.doOrBlock = function (state, skipN = 0) {
  let reg = state.regs[state.r]
  let wasFound = false
  // do each multiword sequence
  for (let c = 0; c < reg.choices.length; c += 1) {
    // try to match this list of tokens
    let block = reg.choices[c]
    wasFound = block.every((cr, w_index) => {
      let tryTerm = state.t + w_index + skipN
      if (state.terms[tryTerm] === undefined) {
        return false
      }
      let foundBlock = state.terms[tryTerm].doesMatch(cr, tryTerm + state.start_i, state.phrase_length)
      // this can be greedy - '(foo+ bar)'
      if (foundBlock === true && cr.greedy === true) {
        for (let i = tryTerm + 1; i < state.terms.length; i += 1) {
          let keepGoing = state.terms[i].doesMatch(cr, state.start_i + i, state.phrase_length)
          if (keepGoing === true) {
            skipN += i
          } else {
            break
          }
        }
      }
      return foundBlock
    })
    if (wasFound) {
      skipN += block.length
      break
    }
  }
  // we found a match -  is it greedy though?
  if (wasFound && reg.greedy === true) {
    return exports.doOrBlock(state, skipN) // try it again!
  }
  return skipN
}

// match AND cases like (#Noun && foo)
exports.doAndBlock = function (state) {
  let longest = 0
  // all blocks must match, and we return the greediest match
  let reg = state.regs[state.r]
  let allDidMatch = reg.choices.every(block => {
    //  for multi-word blocks, all must match
    let allWords = block.every((cr, w_index) => {
      let tryTerm = state.t + w_index
      if (state.terms[tryTerm] === undefined) {
        return false
      }
      return state.terms[tryTerm].doesMatch(cr, tryTerm, state.phrase_length)
    })
    if (allWords === true && block.length > longest) {
      longest = block.length
    }
    return allWords
  })
  if (allDidMatch === true) {
    return longest
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
