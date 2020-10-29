const toInfinitive = require('../toInfinitive')
const toBe = require('./toBe')
const doModal = require('./doModal')

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

  // dont conjugate imperative form - 'close the door'
  // if (parsed.auxiliary.has('do')) {
  //   let str = parsed.original.text()
  //   let res = {
  //     PastTense: str,
  //     PresentTense: str,
  //     FutureTense: str,
  //     Infinitive: str,
  //   }
  //   return res
  // }

  let hasHyphen = parsed.verb.termList(0).hasHyphen()

  let infinitive = toInfinitive(parsed, world)
  if (!infinitive) {
    return {}
  }
  let forms = world.transforms.conjugate(infinitive, world)
  forms.Infinitive = infinitive

  // add particle to phrasal verbs ('fall over')
  if (parsed.particle.found) {
    let particle = parsed.particle.text()
    let space = hasHyphen === true ? '-' : ' '
    Object.keys(forms).forEach(k => (forms[k] += space + particle))
  }
  //put the adverb at the end?
  // if (parsed.adverb.found) {
  // let adverb = parsed.adverb.text()
  // let space = hasHyphen === true ? '-' : ' '
  // if (parsed.adverbAfter === true) {
  //   Object.keys(forms).forEach(k => (forms[k] += space + adverb))
  // } else {
  //   Object.keys(forms).forEach(k => (forms[k] = adverb + space + forms[k]))
  // }
  // }

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
  return forms
}
module.exports = conjugate
