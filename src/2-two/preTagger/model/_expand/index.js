import methods from '../../methods/index.js'
import expandIrregulars from './irregulars.js'

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
const expandSwitchers = function (switchers, model) {
  // get conjugations from maybe-verbs
  const infs = Object.keys(switchers.nounVerb.words).reduce((h, str) => {
    h[str] = 'Infinitive'
    return h
  }, {})
  // model = expandLexicon(infs, model)
  // set the rest as defaults
  let words = {}
  Object.keys(switchers).forEach(k => {
    Object.keys(switchers[k].words).forEach(str => {
      words[str] = switchers[k].fallback
    })
  })
  model = expandLexicon(words, model)
  return model
}

const expand = function (model) {
  model = expandIrregulars(model)
  model = expandLexicon(model.lexicon, model)
  model = addUncountables(model.lexicon, model)
  model = expandSwitchers(model.switchers, model)
  return model
}
export default expand
