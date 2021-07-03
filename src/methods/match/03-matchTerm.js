import fuzzy from './_fuzzy.js'
import methods from './_match-methods.js'

//declare it up here
let wrapMatch = function () {}
/** ignore optional/greedy logic, straight-up term match*/
const doesMatch = function (term, reg, index, length) {
  // support id matches
  // if (reg.id === t.id) {
  //   return true
  // }
  // support '.'
  if (reg.anything === true) {
    return true
  }
  // support '^' (in parentheses)
  if (reg.start === true && index !== 0) {
    return false
  }
  // support '$' (in parentheses)
  if (reg.end === true && index !== length - 1) {
    return false
  }
  //support a text match
  if (reg.word !== undefined) {
    //match contractions
    if (term.implicit !== null && term.implicit === reg.word) {
      return true
    }
    // term aliases for slashes and things
    if (term.alias !== undefined && term.alias.hasOwnProperty(reg.word)) {
      return true
    }
    // support ~ match
    if (reg.soft === true && reg.word === term.root) {
      return true
    }
    // support fuzzy match param
    if (reg.fuzzy !== undefined) {
      let score = fuzzy(reg.word, term.normal)
      if (score > reg.fuzzy) {
        return true
      }
      // support fuzzy + soft match
      if (reg.soft === true) {
        score = fuzzy(reg.word, term.root)
        if (score > reg.fuzzy) {
          return true
        }
      }
    }
    //match either .clean or .text
    return reg.word === term.clean || reg.word === term.text || reg.word === term.normal
  }
  //support #Tag
  if (reg.tag !== undefined) {
    return term.tags.has(reg.tag) === true
  }
  //support @method
  if (reg.method !== undefined) {
    if (typeof methods[reg.method] === 'function' && methods[reg.method](term) === true) {
      return true
    }
    return false
  }
  //support /reg/
  if (reg.regex !== undefined) {
    return reg.regex.test(term.clean)
  }
  // support optimized (one|two)
  if (reg.fastOr !== undefined) {
    if (term.implicit && reg.fastOr.has(term.implicit) === true) {
      return true
    }
    return reg.fastOr.has(term.normal) || reg.fastOr.has(term.text)
  }
  //support slower (one|two)
  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(r => wrapMatch(term, r, index, length))
    }
    // or must match one
    return reg.choices.some(r => wrapMatch(term, r, index, length))
  }
  return false
}
// wrap result for !negative match logic
wrapMatch = function (t, reg, index, length) {
  let result = doesMatch(t, reg, index, length)
  if (reg.negative === true) {
    return !result
  }
  return result
}
export default wrapMatch
