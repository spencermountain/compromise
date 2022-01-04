const getWords = function (model, left, right) {
  return Object.entries(model.exceptions).reduce((h, a) => {
    h[a[0]] = left
    h[a[1]] = right
    return h
  }, {})
}

const expandModels = function (model) {
  let { lexicon, } = model.one
  const { toPast, toPresent, toGerund, toParticiple } = model.two.models
  let res = {}
  // participle-form
  let words = getWords(toParticiple, 'Infinitive', 'Participle')
  Object.assign(res, words)
  // past-tense
  words = getWords(toPast, 'Infinitive', 'PastTense')
  Object.assign(res, words)
  // present-tense
  words = getWords(toPresent, 'Infinitive', 'PresentTense')
  Object.assign(res, words)
  // gerund-form
  words = getWords(toGerund, 'Infinitive', 'Gerund')
  Object.assign(res, words)

  model.one.lexicon = Object.assign(res, lexicon)

  return model
}
export default expandModels