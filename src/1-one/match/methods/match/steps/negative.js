import { matchAt, logGroup, noAnchors } from '../_lib.js'
import negGreedy from './logic/negative-greedy.js'

// '!foo' should match anything that isn't 'foo'
// if it matches, return false
const doNegative = function (state) {
  const { regs } = state
  const reg = regs[state.r]
  const startAt = state.t

  // match *anything* but this term
  const tmpReg = { ...reg }
  tmpReg.negative = false // try removing it

  // found it? if so, we die here
  const found = matchAt(state, tmpReg, state.t)
  if (found) {
    // but '!foo*' can match nothing - '!foo?' stays a lookahead
    return reg.optional === true && reg.greedy === true
  }
  // negative greedy - !foo+  - super hard!
  if (reg.greedy) {
    // like getGreedy, anchors should not apply to the repeated terms
    const alive = negGreedy(state, noAnchors(tmpReg), regs[state.r + 1])
    logGroup(state, startAt)
    return alive
  }
  // should we skip the term too?
  if (reg.optional) {
    // "before after" - "before !foo? after"
    // does the next reg match the this term?
    const nextReg = regs[state.r + 1]
    if (nextReg) {
      const fNext = matchAt(state, nextReg, state.t)
      if (fNext) {
        return true // leave the term, and any capture, to the next reg
      }
      if (nextReg.optional && regs[state.r + 2]) {
        // ugh. ok,
        // support "!foo? extra? need"
        // but don't scan ahead more than that.
        const fNext2 = matchAt(state, regs[state.r + 2], state.t)
        if (fNext2) {
          return true
        }
      }
    }
  }
  state.t += 1
  logGroup(state, startAt)
  return true
}
export default doNegative