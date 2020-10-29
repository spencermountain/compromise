const isPlural = require('../isPlural')

/** too many special cases for is/was/will be*/
const toBe = parsed => {
  let isI = false
  let plural = isPlural(parsed)
  let isNegative = parsed.negative.found
  //account for 'i is' -> 'i am' irregular
  // if (vb.parent && vb.parent.has('i #Adverb? #Copula')) {
  //   isI = true;
  // }
  // 'i look', not 'i looks'
  if (parsed.verb.lookBehind('(i|we) (#Adverb|#Verb)?$').found) {
    isI = true
  }

  let obj = {
    PastTense: 'was',
    PresentTense: 'is',
    FutureTense: 'will be',
    Infinitive: 'is',
    Gerund: 'being',
    Actor: '',
    PerfectTense: 'been',
    Pluperfect: 'been',
  }
  //"i is" -> "i am"
  if (isI === true) {
    obj.PresentTense = 'am'
    obj.Infinitive = 'am'
  }
  if (plural) {
    obj.PastTense = 'were'
    obj.PresentTense = 'are'
    obj.Infinitive = 'are'
  }
  if (isNegative) {
    obj.PastTense += ' not'
    obj.PresentTense += ' not'
    obj.FutureTense = 'will not be'
    obj.Infinitive += ' not'
    obj.PerfectTense = 'not ' + obj.PerfectTense
    obj.Pluperfect = 'not ' + obj.Pluperfect
    obj.Gerund = 'not ' + obj.Gerund
  }
  return obj
}
module.exports = toBe
