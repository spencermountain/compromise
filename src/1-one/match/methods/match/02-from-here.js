import { getGroup } from './_lib.js'
import doAstrix from './steps/astrix.js'
import doOrBlock from './steps/or-block.js'
import doAndBlock from './steps/and-block.js'
import { isEndGreedy, getGreedy } from './logic/greedy.js'
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
      // log(`✗ |terms done|`)
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
    // ok, finally test the term/reg
    let term = state.terms[state.t]
    let hasMatch = matchTerm(term, reg, state.start_i + state.t, state.phrase_length)
    if (reg.anything === true || hasMatch === true || isEndGreedy(reg, state)) {
      let startAt = state.t
      // if it's a negative optional match... :0
      if (reg.optional && regs[state.r + 1] && reg.negative) {
        continue
      }
      // okay, it was a match, but if it's optional too,
      // we should check the next reg too, to skip it?
      if (reg.optional && regs[state.r + 1]) {
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
      // should we clump-in the 2nd word of a contraction?
      // let lastTerm = state.terms[state.t - 1]
      // let thisTerm = state.terms[state.t]
      // if (lastTerm && thisTerm && lastTerm.implicit && thisTerm.implicit) {
      //   // only if it wouldn't match, organically
      //   let nextReg = regs[state.r + 1]
      //   if (!nextReg || !matchTerm(thisTerm, nextReg, state.start_i + state.t, state.phrase_length)) {
      //     state.t += 1
      //   }
      // }
      continue
    }

    // ok, it doesn't match.
    // did it *actually match* a negative?
    if (reg.negative) {
      let tmpReg = Object.assign({}, reg)
      tmpReg.negative = false // try removing it
      let foundNeg = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length)
      if (foundNeg === true) {
        // log(`✗ |no neg|`)
        return null //bye!
      }
    }
    //bah, who cares, keep going
    if (reg.optional === true) {
      // log(`- |optional reg '${reg.word}'|`)
      continue
    }

    if (Boolean(state.terms[state.t].implicit) && regs[state.r - 1] && state.terms[state.t + 1]) {
      // if the last match was implicit too, we're missing a word.
      if (state.terms[state.t - 1] && state.terms[state.t - 1].implicit === regs[state.r - 1].word) {
        return null
      }
      // does the next one match?
      if (matchTerm(state.terms[state.t + 1], reg, state.start_i + state.t, state.phrase_length)) {
        // log(`✓ |contraction| '${state.terms[state.t + 1].implicit}'`)
        state.t += 2
        continue
      }
    }
    return null //die
  }
  //return our results, as pointers
  let pntr = [null, start_i, state.t + start_i] //`${start_i}:${state.t + start_i}`
  if (pntr[1] === pntr[2]) {
    // log(`✗ |found nothing|`)
    return null
  }
  let groups = {}
  Object.keys(state.groups).forEach(k => {
    let o = state.groups[k]
    let start = start_i + o.start
    groups[k] = [null, start, start + o.length] //`${start}:${start + o.length}`
  })
  return { pointer: pntr, groups: groups }
}
export default tryHere
