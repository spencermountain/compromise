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
    if (t.implicit !== null && t.text === reg.word) {
      return true
    }
    //match either .clean or .text
    return reg.word === t.clean || reg.word === t.text
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
  //support (one}two)
  if (reg.choices !== undefined) {
    //recursion alert
    let foundOne = reg.choices.find(r => doesMatch(t, r))
    return foundOne !== undefined
  }
  return false
}
module.exports = doesMatch
