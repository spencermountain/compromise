import matchTerm from '../term/doesMatch.js'

// '!foo' should match anything that isn't 'foo'
// if it matches, return false
const doNegative = function (state) {
  const { regs } = state
  let reg = regs[state.r]
  let tmpReg = Object.assign({}, reg)
  tmpReg.negative = false // try removing it
  let foundNeg = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length)
  if (foundNeg === true) {
    return null //bye!
  }
  return true
}
export default doNegative