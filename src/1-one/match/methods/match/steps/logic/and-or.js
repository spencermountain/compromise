import doesMatch from '../../term/doesMatch.js'

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

// try to match a list of tokens, starting at state.t + skipN
// returns the number of terms it consumed, or 0 for no-match
const tryChoice = function (state, regs, skipN) {
  let len = 0
  for (let w = 0; w < regs.length; w += 1) {
    const cr = regs[w]
    const t = state.t + skipN + len
    if (state.terms[t] === undefined) {
      return 0
    }
    if (doesMatch(state.terms[t], cr, state.start_i + t, state.phrase_length) !== true) {
      return 0
    }
    len += 1
    // this can be greedy - '(foo+ bar)'
    if (cr.greedy === true) {
      // like getGreedy, anchors should not apply to the repeated terms
      const gr = Object.assign({}, cr, { start: false, end: false })
      for (let i = t + 1; i < state.terms.length; i += 1) {
        if (doesMatch(state.terms[i], gr, state.start_i + i, state.phrase_length) !== true) {
          break
        }
        len += 1
      }
    }
  }
  return len
}

// match the first choice that works - '(a b|c)'
const tryChoices = function (state, skipN) {
  const block = state.regs[state.r]
  for (let c = 0; c < block.choices.length; c += 1) {
    const regs = block.choices[c]
    if (!isArray(regs)) {
      return 0
    }
    const len = tryChoice(state, regs, skipN)
    if (len > 0) {
      return len
    }
  }
  return 0
}

export const doOrBlock = function (state) {
  const block = state.regs[state.r]
  let skipN = tryChoices(state, 0)
  if (skipN === 0) {
    return 0
  }
  // greedy or-block - keep matching choices - '(a b|c)+'
  if (block.greedy === true) {
    let more = tryChoices(state, skipN)
    while (more > 0) {
      skipN += more
      more = tryChoices(state, skipN)
    }
  }
  return skipN
}

const doAndBlock = function (state) {
  let longest = 0
  // all blocks must match, and we return the greediest match
  const reg = state.regs[state.r]
  const allDidMatch = reg.choices.every(block => {
    //  for multi-word blocks, all must match
    const allWords = block.every((cr, w_index) => {
      const tryTerm = state.t + w_index
      if (state.terms[tryTerm] === undefined) {
        return false
      }
      return doesMatch(state.terms[tryTerm], cr, state.start_i + tryTerm, state.phrase_length)
    })
    if (allWords === true && block.length > longest) {
      longest = block.length
    }
    return allWords
  })
  if (allDidMatch === true) {
    // console.log(`doAndBlock ${state.terms[state.t].normal}`)
    return longest
  }
  return false
}
export { doAndBlock }