const toInfinitive = require('../toInfinitive')
const toBe = require('./toBe')

const conjugate = function(parsed, world) {
  let verb = parsed.verb

  //special handling of 'is', 'will be', etc.
  if (verb.has('#Copula') || (verb.out('normal') === 'be' && parsed.auxiliary.has('will'))) {
    return toBe(parsed, world)
  }

  let infinitive = toInfinitive(parsed, world)
  if (!infinitive) {
    return {}
  }
  // console.log(infinitive)
  let forms = world.transforms.conjugate(infinitive, world)
  forms.Infinitive = infinitive

  //apply negative
  const isNegative = parsed.negative.found
  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive
    forms.PresentTense = 'does not ' + forms.Infinitive
    forms.Gerund = 'not ' + forms.Gerund
  }
  //future Tense is pretty straightforward
  if (!forms.FutureTense) {
    if (isNegative) {
      forms.FutureTense = 'will not ' + forms.Infinitive
    } else {
      forms.FutureTense = 'will ' + forms.Infinitive
    }
  }
  if (isNegative) {
    forms.Infinitive = 'not ' + forms.Infinitive
  }
  // add particle to phrasal verbs ('fall over')
  if (parsed.particle.found) {
    let particle = parsed.particle.text()
    Object.keys(forms).forEach(k => (forms[k] += ' ' + particle))
  }
  //put the adverb at the end?
  if (parsed.adverb.found) {
    let adverb = parsed.adverb.text()
    Object.keys(forms).forEach(k => (forms[k] += ' ' + adverb))
  }
  return forms
}
module.exports = conjugate
