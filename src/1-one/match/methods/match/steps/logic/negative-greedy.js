import doesMatch from '../../term/doesMatch.js'

const negGreedyTo = function (state, nextReg) {
  let t = state.t
  //if there's no next one, just go off the end!
  if (!nextReg) {
    return state.terms.length
  }
  //otherwise, we're looking for the next one
  for (; t < state.terms.length; t += 1) {
    if (doesMatch(state.terms[t], nextReg, state.start_i + t, state.phrase_length) === true) {
      // console.log(`greedyTo ${state.terms[t].normal}`)
      return t
    }
  }
  //guess it doesn't exist, then.
  return null
}
export { negGreedyTo }