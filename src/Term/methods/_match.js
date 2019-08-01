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
  if (reg.normal !== undefined) {
    //match contractions
    if (t.implicit !== null && t.text === reg.normal) {
      return true
    }
    return reg.normal === t.normal
  }
  //support #Tag
  if (reg.tag !== undefined) {
    return t.tags[reg.tag] === true
  }
  //support /reg/
  if (reg.regex !== undefined) {
    return reg.regex.test(t.normal)
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
