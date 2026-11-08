import doesMatch from './term/doesMatch.js'


export const getGroup = function (state, term_index) {
  // Most attempts fail without capturing anything.
  if (!state.groups) {
    state.groups = {}
  }
  if (state.groups[state.inGroup]) {
    return state.groups[state.inGroup]
  }
  state.groups[state.inGroup] = {
    start: term_index,
    length: 0,
  }
  return state.groups[state.inGroup]
}

// add any terms used since startAt, to the current capture
export const logGroup = function (state, startAt) {
  if (state.hasGroup === true && state.t > startAt) {
    getGroup(state, startAt).length += state.t - startAt
  }
}

// test the reg against the term at array-index t
export const matchAt = (state, reg, t) => doesMatch(state.terms[t], reg, state.start_i + t, state.phrase_length)

// anchors should not apply to repeated terms
export const noAnchors = reg => ({ ...reg, start: false, end: false })

// how many terms a match must have - optional and negative regs don't count
export const getMinLength = regs => regs.filter(reg => reg.optional !== true && reg.negative !== true).length
