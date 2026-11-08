import { matchAt } from '../../_lib.js'

const negGreedy = function (state, reg, nextReg) {
  let skip = 0
  for (let t = state.t; t < state.terms.length; t += 1) {
    let found = matchAt(state, reg, t)
    // we don't want a match, here
    if (found) {
      break//stop going
    }
    // are we doing 'greedy-to'?
    // - "!foo+ after"  should stop at 'after'
    if (nextReg) {
      found = matchAt(state, nextReg, t)
      if (found) {
        break
      }
    }
    skip += 1
    // is it max-length now?
    if (reg.max !== undefined && skip === reg.max) {
      break
    }
  }
  // '!foo* after' can match nothing, and leave this term for the next token
  if (skip === 0) {
    return reg.optional === true //dead, otherwise
  }
  // did we satisfy min for !foo{min,max}
  if (reg.min && reg.min > skip) {
    return false//dead
  }
  state.t += skip
  // state.r += 1
  return true
}

export default negGreedy