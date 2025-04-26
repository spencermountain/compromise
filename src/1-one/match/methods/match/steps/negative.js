import matchTerm from '../term/doesMatch.js'
import negGreedy from './logic/negative-greedy.js'

// '!foo' should match anything that isn't 'foo'
// if it matches, return false
const doNegative = function (state) {
  const { regs } = state
  const reg = regs[state.r]

  // match *anything* but this term
  const tmpReg = Object.assign({}, reg)
  tmpReg.negative = false // try removing it

  // found it? if so, we die here
  const found = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length)
  if (found) {
    return false//bye
  }
  // should we skip the term too?
  if (reg.optional) {
    // "before after" - "before !foo? after"
    // does the next reg match the this term?
    const nextReg = regs[state.r + 1]
    if (nextReg) {
      const fNext = matchTerm(state.terms[state.t], nextReg, state.start_i + state.t, state.phrase_length)
      if (fNext) {
        state.r += 1
      } else if (nextReg.optional && regs[state.r + 2]) {
        // ugh. ok,
        // support "!foo? extra? need"
        // but don't scan ahead more than that.
        const fNext2 = matchTerm(state.terms[state.t], regs[state.r + 2], state.start_i + state.t, state.phrase_length)
        if (fNext2) {
          state.r += 2
        }
      }
    }
  }
  // negative greedy - !foo+  - super hard!
  if (reg.greedy) {
    return negGreedy(state, tmpReg, regs[state.r + 1])
  }
  state.t += 1
  return true
}
export default doNegative