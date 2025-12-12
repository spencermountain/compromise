// for: ['we', 'have']
// a match for "we have" should work as normal
// but matching "we've" should skip over implict terms
const contractionSkip = function (state) {
  const term = state.terms[state.t]
  const reg = state.regs[state.r]
  // did we match the first part of a contraction?
  if (term.implicit && state.terms[state.t + 1]) {
    const nextTerm = state.terms[state.t + 1]
    // ensure next word is implicit
    if (!nextTerm.implicit) {
      return
    }
    // we matched "we've" - skip-over [we, have]
    if (reg.word === term.normal) {
      state.t += 1
    }
    // also skip for @hasContraction
    if (reg.method === 'hasContraction') {
      state.t += 1
    }
  }
}
export default contractionSkip