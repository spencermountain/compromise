import matchTerm from '../term/doesMatch.js'
import { getGroup } from '../_lib.js'
import { getGreedy } from '../logic/greedy.js'

// 'foo? foo' matches are tricky.
const foundOptional = function (state) {
  const { regs } = state
  let reg = regs[state.r]
  let term = state.terms[state.t]
  // does the next reg match it too?
  let nextRegMatched = matchTerm(term, regs[state.r + 1], state.start_i + state.t, state.phrase_length)
  if (reg.negative || nextRegMatched) {
    // but does the next reg match the next term??
    // only skip if it doesn't
    let nextTerm = state.terms[state.t + 1]
    if (!nextTerm || !matchTerm(nextTerm, regs[state.r + 1], state.start_i + state.t, state.phrase_length)) {
      state.r += 1
    }
  }
}

const simpleMatch = function (state) {
  const { regs, phrase_length } = state
  let reg = regs[state.r]

  let startAt = state.t
  // if it's a negative optional match... :0
  if (reg.optional && regs[state.r + 1] && reg.negative) {
    return true
  }
  // okay, it was a match, but if it's optional too,
  // we should check the next reg too, to skip it?
  if (reg.optional && regs[state.r + 1]) {
    foundOptional(state)
  }
  // log(`✓ |matched '${state.terms[state.t].normal}'|`)
  //advance to the next term!
  state.t += 1
  //check any ending '$' flags
  if (reg.end === true) {
    //if this isn't the last term, refuse the match
    if (state.t !== state.terms.length && reg.greedy !== true) {
      // log(`✗ |end-flag|`)
      return null //die
    }
  }
  //try keep it going!
  if (reg.greedy === true) {
    state.t = getGreedy(state, regs[state.r + 1])
    if (state.t === null) {
      // log(`✗ |too-short|`)
      return null //greedy was too short
    }
    if (reg.min && reg.min > state.t) {
      // log(`✗ |too-short2|`)
      return null //greedy was too short
    }
    // if this was also an end-anchor match, check to see we really
    // reached the end
    if (reg.end === true && state.start_i + state.t !== phrase_length) {
      // log(`✗ |not-end|`)
      return null //greedy didn't reach the end
    }
  }
  if (state.hasGroup === true) {
    // Get or create capture group
    const g = getGroup(state, startAt)
    // Update group - add greedy or increment length
    if (state.t > 1 && reg.greedy) {
      g.length += state.t - startAt
    } else {
      g.length++
    }
  }
  return true
}
export default simpleMatch