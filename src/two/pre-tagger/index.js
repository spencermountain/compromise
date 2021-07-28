import _model from './model/index.js'
import _methods from './methods.js'

const preTagger = function (document, world) {
  const { methods, model } = world
  const m = methods.preTagger
  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // lookup known words
    m.checkLexicon(terms, model)
    // look for a starting tag
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = term.tags.size > 0
      // look at word ending
      found = found || m.checkSuffix(term, model)
      //  fallback methods
      m.checkCase(term, i)
      // check for stem in lexicon
      found = found || m.checkPrefix(term, model)
      // try look-like rules
      m.checkRegex(term, model)
      // more-involved regexes
      m.checkAcronym(term, model)
    }
    //  ¯\_(ツ)_/¯ - found nothing
    m.nounFallback(terms, model)
    // deduce parent tags
    m.fillTags(terms, model)
  }
  return document
}

const plugin = function (world) {
  let { methods, model, parsers } = world
  // methods.preTagger = _methods
  Object.assign(methods, _methods)
  const lex = model.lexicon || {} // merge any existing lexicon
  Object.assign(model, _model)
  Object.assign(model.lexicon, lex) //
  parsers.push(preTagger)
  methods.preTagger.expandLexicon(model, methods)
}
export default plugin
