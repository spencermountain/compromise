const toInfinitive = require('../toInfinitive')

const conjugate = function(parsed, world) {
  const isNegative = parsed.negative.found

  let infinitive = toInfinitive(parsed, world)
  let forms = world.transforms.verbs(infinitive, world)
  forms.Infinitive = infinitive

  //apply negative
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
