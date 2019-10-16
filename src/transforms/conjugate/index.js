const checkSuffix = require('./01-suffixes')
const genericFill = require('./02-generic')

//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const conjugate = function(str = '', world) {
  let found = {}
  // 1. look at irregulars
  //the lexicon doesn't pass this in
  if (world && world.irregulars) {
    if (world.irregulars.verbs.hasOwnProperty(str) === true) {
      found = Object.assign({}, world.irregulars.verbs[str])
    }
  }
  //2. rule-based regex
  found = Object.assign({}, checkSuffix(str), found)

  //3. generic transformations
  //'buzzing'
  if (found.Gerund === undefined) {
    found.Gerund = genericFill.Gerund(str)
  }
  //'buzzed'
  if (found.PastTense === undefined) {
    found.PastTense = genericFill.PastTense(str)
  }
  //'buzzes'
  if (found.PresentTense === undefined) {
    found.PresentTense = genericFill.PresentTense(str)
  }
  return found
}
module.exports = conjugate
