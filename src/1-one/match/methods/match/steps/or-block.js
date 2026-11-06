import { doOrBlock } from './logic/and-or.js'
import { getGroup } from '../_lib.js'
import leaveForNext from './optional-match.js'
import negGreedy from './logic/negative-greedy.js'

const orBlock = function (state) {
  const { regs } = state
  const reg = regs[state.r]
  const skipNum = doOrBlock(state)
  // did we find a match?
  if (skipNum) {
    // handle 'not' logic - but '!(a|b)*' can match nothing
    if (reg.negative === true) {
      return reg.optional === true && reg.greedy === true
    }
    // '(a|b)? a' - go on to the next token, without using this term
    if (reg.optional === true && leaveForNext(state)) {
      return true
    }
    // tuck in as named-group
    if (state.hasGroup === true) {
      const g = getGroup(state, state.t)
      g.length += skipNum
    }
    // ensure we're at the end
    if (reg.end === true) {
      const end = state.phrase_length
      if (state.t + state.start_i + skipNum !== end) {
        return null
      }
    }
    state.t += skipNum
    // log(`✓ |found-or|`)
    return true
  }
  // we didn't find it - for a negative-block, that's good news
  if (reg.negative === true) {
    // '!(a|b)+' keeps going
    if (reg.greedy === true) {
      return negGreedy(state, { ...reg, negative: false, start: false, end: false }, regs[state.r + 1])
    }
    // a '!(a b)?' can pass-through without consuming anything
    if (!reg.optional) {
      state.t += 1
    }
    return true
  }
  if (!reg.optional) {
    return null //die
  }
  return true
}
export default orBlock