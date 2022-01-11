
const getWords = function (model, left, right) {
  return Object.entries(model.exceptions).reduce((h, a) => {
    if (left) {
      h[a[0]] = left
    }
    h[a[1]] = right
    return h
  }, {})
}

// const diff = (obj, key, lex) => {
//   Object.keys(obj.exceptions).forEach(k => {
//     let a = [k, obj.exceptions[k]]
//     let str = a[key]
//     if (!lex[str]) {
//       console.log(str)
//     }
//   })
// }

const expandModels = function (model) {
  let { lexicon, } = model.one
  const { toPast, toPresent, toGerund, toParticiple, toSuperlative, toComparative } = model.two.models
  let res = {}
  let words = {}
  // participle-form
  // let words = getWords(toParticiple, 'Infinitive', 'Participle')
  Object.assign(res, words)
  // past-tense
  words = getWords(toPast, 'Infinitive', 'PastTense')
  Object.assign(res, words)
  // diff(toPast, 0, lexicon)
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