import { matchAt } from '../_lib.js'

// 'foo? foo' matches are tricky.
// should this optional token leave its term for the next one?
const leaveForNext = function (state) {
  const next = state.regs[state.r + 1]
  if (!next || !matchAt(state, next, state.t)) {
    return false
  }
  // but does the next reg match the next term??
  // only skip if it doesn't
  const nextTerm = state.terms[state.t + 1]
  return !nextTerm || !matchAt(state, next, state.t + 1)
}

export default leaveForNext
