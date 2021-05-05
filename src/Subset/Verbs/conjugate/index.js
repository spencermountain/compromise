const toInfinitive = require('../toInfinitive')
const toBe = require('./toBe')
const doModal = require('./doModal')
const isPlural = require('../isPlural')

const conjugate = function (parsed, world) {
  let verb = parsed.verb

  //special handling of 'is', 'will be', etc.
  if (verb.has('#Copula') || (verb.out('normal') === 'be' && parsed.auxiliary.has('will'))) {
    return toBe(parsed, world)
  }

  // special handling of 'are walking'
  if (parsed.auxiliary.has('are') && verb.has('#Gerund')) {
    let og = parsed.original.clone()
    let past = og.clone().replace('are', 'were')
    let fut = og.clone().replace('are', 'will be')
    let infinitive = toInfinitive(parsed, world)
    let res = {
      PastTense: past.text(),
      PresentTense: og.text(),
      FutureTense: fut.text(),
      Infinitive: infinitive,
    }
    return res
  }

  // special handling of 'he could.'
  if (verb.has('#Modal')) {
    return doModal(parsed, world)
  }

  // get the root form
  let infinitive = toInfinitive(parsed, world)
  if (!infinitive) {
    return {}
  }
  let forms = world.transforms.conjugate(infinitive, world)
  forms.Infinitive = infinitive
  // Singular: the dog chases
  // Plural: the dogs chase
  let bePlural = isPlural(parsed, world)
  if (bePlural === true) {
    forms.PresentTense = forms.Infinitive // the dogs chase
  }

  // add particle to phrasal verbs ('fall over')
  let hasHyphen = parsed.verb.termList(0).hasHyphen()
  if (parsed.particle.found) {
    let particle = parsed.particle.text()
    let space = hasHyphen === true ? '-' : ' '
    Object.keys(forms).forEach(k => (forms[k] += space + particle))
  }

  //apply negative
  const isNegative = parsed.negative.found
  forms.FutureTense = forms.FutureTense || 'will ' + forms.Infinitive
  if (isNegative) {
    forms.PastTense = 'did not ' + forms.Infinitive
    forms.FutureTense = 'will not ' + forms.Infinitive
    if (bePlural) {
      forms.PresentTense = 'do not ' + forms.Infinitive
      forms.Infinitive = 'do not ' + forms.Infinitive
    } else {
      forms.PresentTense = 'does not ' + forms.Infinitive
      forms.Infinitive = 'does not ' + forms.Infinitive
    }
    forms.Gerund = 'not ' + forms.Gerund
  }
  return forms
}
module.exports = conjugate
