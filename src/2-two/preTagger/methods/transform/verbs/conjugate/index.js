import checkSuffix from './01-suffixes.js'
import genericFill from './02-generic.js'

//we run this on every verb in the lexicon, so please keep it fast
//we assume the input word is a proper infinitive
const conjugate = function (inf, model) {
  // ad-hoc Copula response
  if (inf === 'be') {
    return {
      Infinitive: inf,
      Gerund: 'being',
      PastTense: 'was',
      PresentTense: 'is',
    }
  }
  let found = {}
  const irregs = model.two.irregularVerbs
  let particle = ''
  // pull-apart phrasal verb 'fall over'
  if (/ /.test(inf)) {
    let split = inf.split(/ /)
    inf = split[0]
    particle = split[1]
  }
  // 1. look at irregulars
  //the lexicon doesn't pass this in
  if (irregs && irregs.hasOwnProperty(inf) === true) {
    found = Object.assign({}, irregs[inf])
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
  // put phrasal-verbs back together again
  if (particle) {
    Object.keys(found).forEach(k => {
      found[k] += ' ' + particle
    })
  }
  return found
}

export default conjugate

