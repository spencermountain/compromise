//declare it up here
let wrapMatch = function() {}

/** ignore optional/greedy logic, straight-up term match*/
const doesMatch = function(t, reg) {
  // support id matches
  if (reg.id === t.id) {
    return true
  }
  // support '.'
  if (reg.anything === true) {
    return true
  }
  //support a text match
  if (reg.word !== undefined) {
    //match contractions
    if (t.implicit !== null && t.implicit === reg.word) {
      return true
    }
    // term aliases for slashes and things
    if (t.alias !== undefined && t.alias.hasOwnProperty(reg.word)) {
      return true
    }
    // support ~ match
    if (reg.soft === true && reg.word === t.root) {
      return true
    }
    //match either .clean or .text
    return reg.word === t.clean || reg.word === t.text || reg.word === t.reduced
  }
  //support #Tag
  if (reg.tag !== undefined) {
    return t.tags[reg.tag] === true
  }
  //support @method
  if (reg.method !== undefined) {
    if (typeof t[reg.method] === 'function' && t[reg.method]() === true) {
      return true
    }
    return false
  }
  //support /reg/
  if (reg.regex !== undefined) {
    return reg.regex.test(t.clean)
  }
  //support (one|two)
  if (reg.choices !== undefined) {
    // try to support && operator
    if (reg.operator === 'and') {
      // must match them all
      return reg.choices.every(r => wrapMatch(t, r))
    }
    // or must match one
    return reg.choices.some(r => wrapMatch(t, r))
    // for (let i = 0; i < reg.choices.length; i++) {
    //   if (wrapMatch(t, reg.choices[i]) === true) {
    //     return true
    //   }
    // }
  }
  return false
}

// wrap result for !negative match logic
wrapMatch = function(t, reg) {
  let result = doesMatch(t, reg)
  if (reg.negative === true) {
    return !result
  }
  return result
}

module.exports = wrapMatch
