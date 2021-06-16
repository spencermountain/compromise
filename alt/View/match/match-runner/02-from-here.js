const logic = require('./_match-logic')
const matchTerm = require('./03-matchTerm')
// i formally apologize for how complicated this is.

/** tries to match a sequence of terms, starting from here */
const tryHere = function (terms, regs, start_i, phrase_length) {
  // all the variables that matter
  let state = {
    t: 0, //the term index we're on
    terms: terms, //the working slice of term objects
    r: 0, // the reg index we're on
    regs: regs, //our match conditions
    groups: {}, //all named-group matches
    start_i: start_i, // term index we're starting from
    phrase_length: phrase_length, // # of terms in the sentence
    inGroup: null,
  }

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
    //support 'unspecific greedy' .* properly
    if (reg.anything === true && reg.greedy === true) {
      let skipto = logic.greedyTo(state, regs[state.r + 1])
      //maybe we couldn't find it
      if (skipto === null || skipto === 0) {
        return null
      }
      // ensure it's long enough
      if (reg.min !== undefined && skipto - state.t < reg.min) {
        return null
      }
      // reduce it back, if it's too long
      if (reg.max !== undefined && skipto - state.t > reg.max) {
        state.t = state.t + reg.max
        continue
      }
      // set the group result
      if (state.hasGroup === true) {
        const g = logic.getGroup(state, state.t)
        g.length = skipto - state.t
      }
      state.t = skipto
      continue
    }

    // support multi-word OR (a|b|foo bar)
    if (reg.choices !== undefined && reg.operator === 'or') {
      let skipNum = logic.doOrBlock(state)
      if (skipNum) {
        // handle 'not' logic
        if (reg.negative === true) {
          return null // die
        }
        if (state.hasGroup === true) {
          const g = logic.getGroup(state, state.t)
          g.length += skipNum
        }
        state.t += skipNum
        continue
      } else if (!reg.optional) {
        return null //die
      }
    }

    // support AND (#Noun && foo) blocks
    if (reg.choices !== undefined && reg.operator === 'and') {
      let skipNum = logic.doAndBlock(state)
      if (skipNum) {
        // handle 'not' logic
        if (reg.negative === true) {
          return null // die
        }
        if (state.hasGroup === true) {
          const g = logic.getGroup(state, state.t)
          g.length += skipNum
        }
        state.t += skipNum
        continue
      } else if (!reg.optional) {
        return null //die
      }
    }

    // ok, finally test the term/reg
    let term = state.terms[state.t]
    let hasMatch = matchTerm(term, reg, state.start_i + state.t, state.phrase_length)
    if (reg.anything === true || hasMatch === true || logic.isEndGreedy(reg, state)) {
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
      //advance to the next term!
      state.t += 1
      //check any ending '$' flags
      if (reg.end === true) {
        //if this isn't the last term, refuse the match
        if (state.t !== state.terms.length && reg.greedy !== true) {
          return null //die
        }
      }

      //try keep it going!
      if (reg.greedy === true) {
        state.t = logic.getGreedy(state, regs[state.r + 1])
        if (state.t === null) {
          return null //greedy was too short
        }
        if (reg.min && reg.min > state.t) {
          return null //greedy was too short
        }
        // if this was also an end-anchor match, check to see we really
        // reached the end
        if (reg.end === true && state.start_i + state.t !== phrase_length) {
          return null //greedy didn't reach the end
        }
      }

      if (state.hasGroup === true) {
        // Get or create capture group
        const g = logic.getGroup(state, startAt)
        // Update group - add greedy or increment length
        if (state.t > 1 && reg.greedy) {
          g.length += state.t - startAt
        } else {
          g.length++
        }
      }
      continue
    }
    // ok, it doesn't match.

    // did it *actually match* a negative?
    if (reg.negative) {
      let tmpReg = Object.assign({}, reg)
      tmpReg.negative = false // try removing it
      let foundNeg = matchTerm(state.terms[state.t], tmpReg, state.start_i + state.t, state.phrase_length)
      if (foundNeg === true) {
        return null //bye!
      }
    }

    //bah, who cares, keep going
    if (reg.optional === true) {
      continue
    }
    // should we skip-over an implicit word?
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
  let pntr = `${start_i}>${state.t + start_i}`
  let groups = {}
  Object.keys(state.groups).forEach(k => {
    let o = state.groups[k]
    let start = start_i + o.start
    groups[k] = `${start}>${start + o.length}`
  })
  return { pointer: pntr, groups: groups }
}
module.exports = tryHere
