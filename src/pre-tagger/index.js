import _model from './model/index.js'
import _methods from './methods/index.js'

const preTagger = function (document, world) {
  const { methods, model } = world
  const m = methods.preTagger
  // start with all terms
  let terms = []
  for (let i = 0; i < document.length; i += 1) {
    for (let o = 0; o < document[i].length; o += 1) {
      let t = document[i][o]
      t.tags = t.tags === undefined ? new Set() : t.tags // set empty tags
      terms.push(t)
    }
  }
  // lookup known words
  m.checkLexicon(terms, model)
  // look at word ending
  m.checkSuffix(terms, model)
  // try look-like rules
  m.checkRegex(terms, model)
  //  fallback methods
  m.checkCase(document)
  // more-involved regexes
  m.checkAcronym(terms, model)
  // check for stem in lexicon
  m.checkPrefix(terms, model)
  //  ¯\_(ツ)_/¯
  m.nounFallback(document, model)
  // deduce parent tags
  m.fillTags(terms, model)
  return document
}

const plugin = function (world) {
  let { methods, model, parsers } = world
  methods.preTagger = _methods
  const lex = model.lexicon || {} // merge any existing lexicon
  Object.assign(model, _model)
  Object.assign(model.lexicon, lex) //
  parsers.push(preTagger)
  methods.preTagger.expandLexicon(model, methods)
}
export default plugin
