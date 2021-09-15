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

// harvest ambiguous words for any conjugations
const expandSwitchers = function (switches, model) {
  // get conjugations from maybe-verbs
  const infs = Array.from(switches.NounVerb).reduce((h, str) => {
    h[str] = 'Infinitive'
    return h
  }, {})
  model = expandLexicon(infs, model)
  return model
}

const expand = function (model) {
  model = expandIrregulars(model)
  model = expandSwitchers(model.switchLexicon, model)
  model = expandLexicon(model.lexicon, model)
  return model
}
export default expand
