import methods from '../../methods/index.js'
import expandIrregulars from './irregulars.js'
import variables from './variables.js'

const expandLexicon = function (words, model) {
  // do clever tricks to grow the words
  const world = { model: { two: model }, methods }
  let { lex, _multi } = methods.two.expandLexicon(words, world)
  // store multiple-word terms in a cache
  Object.assign(model.lexicon, lex)
  Object.assign(model._multiCache, _multi)
  return model
}

// these words have no singular/plural conjugation
const addUncountables = function (words, model) {
  Object.keys(words).forEach(k => {
    if (words[k] === 'Uncountable') {
      model.uncountable[k] = true
      words[k] = 'Noun'
    }
  })
  return model
}

// harvest ambiguous words for any conjugations
const expandVariable = function (switchWords, model) {
  let words = {}
  //add first tag as an assumption for each variable word
  Object.keys(switchWords).forEach(w => {
    variables[switchWords[w]](w, words)
  })
  // get conjugations from maybe-verbs
  // const infs = Object.keys(switches.nounVerb.words).reduce((h, str) => {
  //   h[str] = 'Infinitive'
  //   return h
  // }, {})
  // model = expandLexicon(infs, model)
  // set the rest as defaults
  // Object.keys(switches).forEach(k => {
  //   Object.keys(switches[k].words).forEach(str => {
  //     words[str] = switches[k].fallback
  //   })
  // })
  model = expandLexicon(words, model)
  return model
}

const expand = function (model) {
  model = expandIrregulars(model)
  model = expandLexicon(model.lexicon, model)
  model = addUncountables(model.lexicon, model)
  model = expandVariable(model.variables, model)
  return model
}
export default expand
