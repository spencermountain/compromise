import checkSuffix from './01-suffixes.js'
import genericFill from './02-generic.js'
//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const conjugate = function (inf = '', model) {
  let found = {}
  // 1. look at irregulars
  //the lexicon doesn't pass this in
  if (model.irregularVerbs) {
    if (model.irregularVerbs.hasOwnProperty(inf) === true) {
      found = Object.assign({}, model.irregularVerbs[inf])
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
export default conjugate
