import matchTerm from '../term/doesMatch.js'

// "will not" should match ['will', 'not']
// "won't" should match ['will', 'not']
// "will foo" should not.
const skipContraction = function (state) {
  let reg = state.regs[state.r]
  let wordOne = state.terms[state.t - 1]
  // knowing *how* we matched wordOne is important

  // matches "won't" 
  if (reg.word && reg.word === wordOne.normal) {
    state.t += 1
    return true
  }

  // matches "will not"
  let wordTwo = state.terms[state.t]
  let nextReg = state.regs[state.r + 1]
  if (nextReg && matchTerm(wordTwo, nextReg, state.start_i + state.t, state.phrase_length)) {
    state.t += 1
    state.r += 1
    return true
  }
}
export default skipContraction