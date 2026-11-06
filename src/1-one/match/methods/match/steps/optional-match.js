import matchTerm from '../term/doesMatch.js'

// 'foo? foo' matches are tricky.
// should this optional token leave its term for the next one?
const leaveForNext = function (state) {
  const next = state.regs[state.r + 1]
  if (!next || !matchTerm(state.terms[state.t], next, state.start_i + state.t, state.phrase_length)) {
    return false
  }
  // but does the next reg match the next term??
  // only skip if it doesn't
  const nextTerm = state.terms[state.t + 1]
  return !nextTerm || !matchTerm(nextTerm, next, state.start_i + state.t + 1, state.phrase_length)
}

export default leaveForNext
