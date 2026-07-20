import { doAndBlock } from './logic/and-or.js'
import { getGroup } from '../_lib.js'

// '(foo && #Noun)' - require all matches on the term
const andBlock = function (state) {
  const { regs } = state
  const reg = regs[state.r]

  const skipNum = doAndBlock(state)
  if (skipNum) {
    // handle 'not' logic
    if (reg.negative === true) {
      return null // die
    }
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
    // log(`✓ |found-and|`)
    return true
  }
  // we didn't find it - for a negative-block, that's good news
  if (reg.negative === true) {
    // a '!(a && b)?' can pass-through without consuming anything
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
export default andBlock