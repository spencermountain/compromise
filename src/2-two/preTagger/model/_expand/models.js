
const getWords = function (model, left, right) {
  return Object.entries(model.exceptions).reduce((h, a) => {
    if (left) {
      h[a[0]] = left
    }
    h[a[1]] = right
    return h
  }, {})
}


const expandModels = function (model) {
  let { lexicon } = model.one
  const { toPast, toPresent, toGerund, toSuperlative, toComparative } = model.two.models
  let res = {}
  let words = {}
  // past-tense
  words = getWords(toPast, 'Infinitive', 'PastTense')
  Object.assign(res, words)
  // present-tense
  words = getWords(toPresent, 'Infinitive', 'Verb')
  Object.assign(res, words)
  // gerund-form
  words = getWords(toGerund, 'Infinitive', 'Gerund')
  Object.assign(res, words)
  // superlative
  words = getWords(toSuperlative, 'Adjective', 'Superlative')
  Object.assign(res, words)
  // comparative
  words = getWords(toComparative, 'Adjective', 'Comparative')
  Object.assign(res, words)

  model.one.lexicon = Object.assign(res, lexicon)

  return model
}
export default expandModels