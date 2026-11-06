import doesMatch from '../../term/doesMatch.js'

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
      const gr = { ...cr, start: false, end: false }
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
    if (!Array.isArray(regs)) {
      return 0
    }
    const len = tryChoice(state, regs, skipN)
    if (len > 0) {
      return len
    }
  }
  return 0
}

const tryAndBlock = function (state, skipN) {
  let longest = 0
  // all blocks must match, and we return the greediest match
  const reg = state.regs[state.r]
  const allDidMatch = reg.choices.every(block => {
    //  for multi-word blocks, all must match
    const allWords = block.every((cr, w_index) => {
      const tryTerm = state.t + skipN + w_index
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
    return longest
  }
  return 0
}

// match a block, and keep going if it's greedy - '(a b|c)+', '(a && b){2,3}'
const repeatBlock = function (state, tryBlock) {
  const reg = state.regs[state.r]
  let skipN = tryBlock(state, 0)
  if (skipN === 0 || reg.greedy !== true) {
    return skipN
  }
  const next = state.regs[state.r + 1]
  let count = 1
  while (count !== reg.max) {
    const t = state.t + skipN
    const term = state.terms[t]
    const hasMin = reg.min === undefined || count >= reg.min
    // stop for the next token, like 'foo+ bar'
    if (!term || (next && hasMin && doesMatch(term, next, state.start_i + t, state.phrase_length))) {
      break
    }
    const more = tryBlock(state, skipN)
    if (more === 0) {
      break
    }
    skipN += more
    count += 1
  }
  // 'foo{2,3}' was too short
  if (reg.min !== undefined && count < reg.min) {
    return 0
  }
  return skipN
}

const doOrBlock = state => repeatBlock(state, tryChoices)
const doAndBlock = state => repeatBlock(state, tryAndBlock)

export { doOrBlock, doAndBlock }