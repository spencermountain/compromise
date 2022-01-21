import doesMatch from './04-doesMatch.js'

const env = typeof process === 'undefined' ? self.env || {} : process.env
const log = msg => {
  if (env.DEBUG_MATCH) {
    console.log(`\n  \x1b[32m ${msg} \x1b[0m`) // eslint-disable-line
  }
}

// for greedy checking, we no longer care about the reg.start
// value, and leaving it can cause failures for anchored greedy
// matches.  ditto for end-greedy matches: we need an earlier non-
// ending match to succceed until we get to the actual end.
export const getGreedy = function (state, endReg) {
  let reg = Object.assign({}, state.regs[state.r], { start: false, end: false })
  let start = state.t
  for (; state.t < state.terms.length; state.t += 1) {
    //stop for next-reg match
    if (endReg && doesMatch(state.terms[state.t], endReg, state.start_i + state.t, state.phrase_length)) {
      return state.t
    }
    let count = state.t - start + 1
    // is it max-length now?
    if (reg.max !== undefined && count === reg.max) {
      return state.t
    }
    //stop here
    if (doesMatch(state.terms[state.t], reg, state.start_i + state.t, state.phrase_length) === false) {
      // is it too short?
      if (reg.min !== undefined && count < reg.min) {
        return null
      }
      return state.t
    }
  }
  return state.t
}

export const greedyTo = function (state, nextReg) {
  let t = state.t
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return state.terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < state.terms.length; t += 1) {
    if (doesMatch(state.terms[t], nextReg, state.start_i + t, state.phrase_length) === true) {
      log(`greedyTo ${state.terms[t].normal}`)
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
}

export const isEndGreedy = function (reg, state) {
  if (reg.end === true && reg.greedy === true) {
    if (state.start_i + state.t < state.phrase_length - 1) {
      let tmpReg = Object.assign({}, reg, { end: false })
      if (doesMatch(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length) === true) {
        log(`endGreedy ${state.terms[state.t].normal}`)
        return true
      }
    }
  }
  return false
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export const doOrBlock = function (state, skipN = 0) {
  let block = state.regs[state.r]
  let wasFound = false
  // do each multiword sequence
  for (let c = 0; c < block.choices.length; c += 1) {
    // try to match this list of tokens
    let regs = block.choices[c]
    if (!isArray(regs)) {
      // console.log('=-=-=-= bad -=-=-=-')
      // console.dir(state.regs, { depth: 5 })
      return false
    }// } else {
    //   // console.log('=-=-=-= good -=-=-=-')
    //   // console.dir(state.regs[0], { depth: 5 })
    // }
    wasFound = regs.every((cr, w_index) => {
      let extra = 0
      let t = state.t + w_index + skipN + extra
      if (state.terms[t] === undefined) {
        return false
      }
      let foundBlock = doesMatch(state.terms[t], cr, t + state.start_i, state.phrase_length)
      // this can be greedy - '(foo+ bar)'
      if (foundBlock === true && cr.greedy === true) {
        for (let i = 1; i < state.terms.length; i += 1) {
          let term = state.terms[t + i]
          if (term) {
            let keepGoing = doesMatch(term, cr, state.start_i + i, state.phrase_length)
            if (keepGoing === true) {
              extra += 1
            } else {
              break
            }
          }
        }
      }
      skipN += extra
      return foundBlock
    })
    if (wasFound) {
      skipN += regs.length
      break
    }
  }
  // we found a match -  is it greedy though?
  if (wasFound && block.greedy === true) {
    return doOrBlock(state, skipN) // try it again!
  }
  return skipN
}

export const doAndBlock = function (state) {
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
      return doesMatch(state.terms[tryTerm], cr, tryTerm, state.phrase_length)
    })
    if (allWords === true && block.length > longest) {
      longest = block.length
    }
    return allWords
  })
  if (allDidMatch === true) {
    log(`doAndBlock ${state.terms[state.t].normal}`)
    return longest
  }
  return false
}

export const getGroup = function (state, term_index) {
  if (state.groups[state.inGroup]) {
    return state.groups[state.inGroup]
  }
  state.groups[state.inGroup] = {
    start: term_index,
    length: 0,
  }
  return state.groups[state.inGroup]
}
