import doAstrix from './steps/astrix.js'
import doOrBlock from './steps/or-block.js'
import doAndBlock from './steps/and-block.js'
import doNegative from './steps/negative.js'
import simpleMatch from './steps/simple-match.js'
import { isEndGreedy } from './logic/greedy.js'
import matchTerm from './term/doesMatch.js'


// i formally apologize for how complicated this is.
/** tries to match a sequence of terms, starting from here */
const tryHere = function (terms, regs, start_i, phrase_length) {
  if (terms.length === 0 || regs.length === 0) {
    return null
  }
  // all the variables that matter
  let state = {
    t: 0,
    terms: terms,
    r: 0,
    regs: regs,
    groups: {},
    start_i: start_i,
    phrase_length: phrase_length,
    inGroup: null,
  }
  // log('-> [' + terms.map(t => t.implicit || t.normal).join(', ') + ']')

  // we must satisfy each rule in 'regs'
  for (; state.r < regs.length; state.r += 1) {
    let reg = regs[state.r]
    // Check if this reg has a named capture group
    state.hasGroup = Boolean(reg.group)
    // Reuse previous capture group if same
    if (state.hasGroup === true) {
      state.inGroup = reg.group
    } else {
      state.inGroup = null
    }
    //have we run-out of terms?
    if (!state.terms[state.t]) {
      //are all remaining regs optional or negative?
      const haveNeeds = regs.slice(state.r).some(remain => !remain.optional)
      if (haveNeeds === false) {
        break //done!
      }
      return null // die
    }
    // support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let alive = doAstrix(state)
      if (!alive) {
        return null
      }
      continue
    }
    // support multi-word OR (a|b|foo bar)
    if (reg.choices !== undefined && reg.operator === 'or') {
      let alive = doOrBlock(state)
      if (!alive) {
        return null
      }
      continue
    }
    // support AND (#Noun && foo) blocks
    if (reg.choices !== undefined && reg.operator === 'and') {
      let alive = doAndBlock(state)
      if (!alive) {
        return null
      }
      continue
    }
    // support '.' any, but single
    if (reg.anything === true) {
      let alive = simpleMatch(state)
      if (!alive) {
        return null
      }
      continue
    }
    // ok, finally test the term/reg
    let hasMatch = matchTerm(state.terms[state.t], reg, state.start_i + state.t, state.phrase_length)
    if (hasMatch === true || isEndGreedy(reg, state)) {
      let alive = simpleMatch(state)
      if (!alive) {
        return null
      }
      continue
    }

    // ok, it doesn't match.
    // did it *actually match* a negative?
    if (reg.negative) {
      let alive = doNegative(state)
      if (!alive) {
        return null
      }
    }
    //bah, who cares, keep going
    if (reg.optional === true) {
      continue
    }

    if (Boolean(state.terms[state.t].implicit) && regs[state.r - 1] && state.terms[state.t + 1]) {
      // if the last match was implicit too, we're missing a word.
      if (state.terms[state.t - 1] && state.terms[state.t - 1].implicit === regs[state.r - 1].word) {
        return null
      }
      // does the next one match?
      if (matchTerm(state.terms[state.t + 1], reg, state.start_i + state.t, state.phrase_length)) {
        state.t += 2
        continue
      }
    }
    return null //die
  }
  //return our results, as pointers
  let pntr = [null, start_i, state.t + start_i]
  if (pntr[1] === pntr[2]) {
    //found 0 terms
    return null
  }
  let groups = {}
  Object.keys(state.groups).forEach(k => {
    let o = state.groups[k]
    let start = start_i + o.start
    groups[k] = [null, start, start + o.length]
  })
  return { pointer: pntr, groups: groups }
}
export default tryHere
