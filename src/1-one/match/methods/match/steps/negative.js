import matchTerm from '../term/doesMatch.js'

// '!foo' should match anything that isn't 'foo'
// if it matches, return false
const doNegative = function (state) {
  const { regs } = state
  let reg = regs[state.r]



  // match *anything* but this term
  let tmpReg = Object.assign({}, reg)
  tmpReg.negative = false // try removing it
  let found = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length)
  if (found) {
    return false//die
  }

  // should we skip the term too?
  // "before after"
  //  match("before !foo? after")
  if (reg.optional) {
    // does the next reg match the this term?
    let nextReg = regs[state.r + 1]
    if (nextReg) {
      let fNext = matchTerm(state.terms[state.t], nextReg, state.start_i + state.t, state.phrase_length)
      if (fNext) {
        state.r += 1
      } else if (nextReg.optional && regs[state.r + 2]) {
        // ugh. ok,
        // support "!foo? extra? need"
        // but don't scan ahead more than that.
        let fNext2 = matchTerm(state.terms[state.t], regs[state.r + 2], state.start_i + state.t, state.phrase_length)
        if (fNext2) {
          state.r += 2
        }
      }
    }
  }

  state.t += 1
  return true
}
export default doNegative