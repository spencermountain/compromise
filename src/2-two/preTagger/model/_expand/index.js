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
    // switchers.nounVerb.words[str + 's'] = true
    return h
  }, {})
  model = expandLexicon(infs, model)
  return model
}

const expand = function (model) {
  model = expandIrregulars(model)
  model = expandSwitchers(model.switchers, model)
  model = expandLexicon(model.lexicon, model)
  model = addUncountables(model.lexicon, model)
  return model
}
export default expand
