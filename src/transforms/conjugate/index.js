const checkSuffix = require('./01-suffixes')
const genericFill = require('./02-generic')

//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const conjugate = function (inf = '', world) {
  let found = {}
  // 1. look at irregulars
  //the lexicon doesn't pass this in
  if (world && world.irregulars) {
    if (world.irregulars.verbs.hasOwnProperty(inf) === true) {
      found = Object.assign({}, world.irregulars.verbs[inf])
    }
  }
  //2. rule-based regex
  found = Object.assign({}, checkSuffix(inf), found)

  //3. generic transformations
  //'buzzing'
  if (found.Gerund === undefined) {
    found.Gerund = genericFill.Gerund(inf)
  }
  //'buzzed'
  if (found.PastTense === undefined) {
    found.PastTense = genericFill.PastTense(inf)
  }
  //'buzzes'
  if (found.PresentTense === undefined) {
    found.PresentTense = genericFill.PresentTense(inf)
  }
  return found
}
module.exports = conjugate

// console.log(conjugate('bake'))
