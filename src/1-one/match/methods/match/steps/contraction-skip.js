// for: ['we', 'have']
// a match for "we have" should work as normal
// but matching "we've" should skip over implict terms
const contractionSkip = function (state) {
  const term = state.terms[state.t]
  const reg = state.regs[state.r]
  // did we match the first part of a contraction?
  if (!term.implicit || !state.terms[state.t + 1]?.implicit) {
    return
  }
  // we matched "we've", or @hasContraction - skip over all of its hidden words, [we, have]
  if (reg.word === term.normal || reg.method === 'hasContraction') {
    let next = state.terms[state.t + 1]
    // a hidden word has no text of its own - the next contraction starts at a word that does
    while (next && next.implicit && next.text === '') {
      state.t += 1
      next = state.terms[state.t + 1]
    }
  }
}
export default contractionSkip
