import { doAndBlock } from './logic/and-or.js'
import { getGroup } from '../_lib.js'
import leaveForNext from './optional-match.js'
import negativeBlock from './logic/negative-block.js'

// '(foo && #Noun)' - require all matches on the term
const andBlock = function (state) {
  const { regs } = state
  const reg = regs[state.r]

  const skipNum = doAndBlock(state)
  if (skipNum) {
    // handle 'not' logic - but '!(a && b)*' can match nothing
    if (reg.negative === true) {
      return reg.optional === true && reg.greedy === true
    }
    // '(a && b)? a' - go on to the next token, without using this term
    if (reg.optional === true && leaveForNext(state)) {
      return true
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
    return negativeBlock(state)
  }
  if (!reg.optional) {
    return null //die
  }
  return true
}
export default andBlock