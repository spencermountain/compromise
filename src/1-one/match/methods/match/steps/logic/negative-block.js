import negGreedy from './negative-greedy.js'
import { logGroup, noAnchors } from '../../_lib.js'

// a negative block didn't find its terms - that's good news
const negativeBlock = function (state) {
  const reg = state.regs[state.r]
  const startAt = state.t
  let alive = true
  if (reg.greedy === true) {
    // '!(a|b)+' keeps going - anchors should not apply to the repeated terms
    alive = negGreedy(state, noAnchors({ ...reg, negative: false }), state.regs[state.r + 1])
  } else if (!reg.optional) {
    // but a '!(a b)?' can pass-through without consuming anything
    state.t += 1
  }
  logGroup(state, startAt)
  return alive
}

export default negativeBlock
