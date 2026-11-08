import doAstrix from './steps/astrix.js'
import doOrBlock from './steps/or-block.js'
import doAndBlock from './steps/and-block.js'
import doNegative from './steps/negative.js'
import simpleMatch from './steps/simple-match.js'
import { isEndGreedy } from './steps/logic/greedy.js'
import { matchAt } from './_lib.js'
// i formally apologize for how complicated this is.

// choose how to consume this reg: a step function, null to die, or undefined to skip it
const pickStep = function (reg, state) {
  // support 'unspecific greedy' .* properly
  if (reg.anything === true && reg.greedy === true) {
    return doAstrix
  }
  // slow-OR - multi-word OR (a|b|foo bar)
  if (reg.choices !== undefined && reg.operator === 'or') {
    return doOrBlock
  }
  // slow-AND - multi-word AND (#Noun && foo) blocks
  if (reg.choices !== undefined && reg.operator === 'and') {
    return doAndBlock
  }
  // support '.' as any-single
  if (reg.anything === true) {
    // '!.' negative anything should insta-fail
    if (reg.negative) {
      return null
    }
    return simpleMatch
  }
  // support 'foo*$' until the end
  if (isEndGreedy(reg, state) === true) {
    return simpleMatch
  }
  // ok, it doesn't match - but maybe it wasn't *supposed* to?
  if (reg.negative) {
    // we want *anything* but this term
    return doNegative
  }
  // ok, finally test the term-reg
  if (matchAt(state, reg, state.t) === true) {
    return simpleMatch
  }
  //ok who cares, keep going
  if (reg.optional === true) {
    return undefined
  }
  // finally, we die
  return null
}

/**
 * try a sequence of match tokens ('regs')
 * on a sequence of terms,
 * starting at this certain term.
 */
const tryHere = function (terms, regs, start_i, phrase_length, offset = 0) {
  // console.log(`\n\n:start: '${terms[0].text}':`)
  if (offset >= terms.length || regs.length === 0) {
    return null
  }
  // Use the original terms with a cursor instead of copying the remaining
  // sentence at every starting position. origin maps array indices to match
  // pointers; offset marks the beginning of this attempt within the array.
  const origin = start_i - offset
  const state = {
    t: offset,
    offset: offset,
    terms: terms,
    r: 0,
    regs: regs,
    groups: null,
    start_i: origin,
    phrase_length: phrase_length,
    inGroup: null,
  }

  // we must satisfy every token in 'regs'
  // if we get to the end, we have a match.
  for (; state.r < regs.length; state.r += 1) {
    const reg = regs[state.r]
    // Check if this reg has a named capture group
    state.hasGroup = Boolean(reg.group)
    // Reuse previous capture group if same
    state.inGroup = state.hasGroup ? reg.group : null
    //have we run-out of terms?
    if (!state.terms[state.t]) {
      //are all remaining regs optional or negative?
      const alive = regs.slice(state.r).some(remain => !remain.optional)
      if (alive === false) {
        break //done!
      }
      return null // die
    }
    const step = pickStep(reg, state)
    if (step === null) {
      return null
    }
    if (step && !step(state)) {
      return null
    }
  }
  //return our results, as pointers
  const pntr = [null, start_i, state.t + origin]
  if (pntr[1] === pntr[2]) {
    return null //found 0 terms
  }
  const groups = {}
  if (state.groups) {
    Object.keys(state.groups).forEach(k => {
      const o = state.groups[k]
      const start = origin + o.start
      groups[k] = [null, start, start + o.length]
    })
  }
  return { pointer: pntr, groups: groups }
}
export default tryHere
