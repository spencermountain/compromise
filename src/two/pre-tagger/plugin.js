import _model from './model/index.js'
import fns from './methods.js'

const preTagger = function (document, model) {
  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // lookup known words
    fns.checkLexicon(terms, model)
    // look for a starting tag
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = term.tags.size > 0
      // look at word ending
      found = found || fns.checkSuffix(term, model)
      //  fallback methods
      fns.checkCase(term, i)
      // check for stem in lexicon
      found = found || fns.checkPrefix(term, model)
      // try look-like rules
      fns.checkRegex(term, model)
      // more-involved regexes
      fns.checkAcronym(term, model)
    }
    //  ¯\_(ツ)_/¯ - found nothing
    fns.nounFallback(terms, model)
    // deduce parent tags
    fns.fillTags(terms, model)
  }
  return document
}

const plugin = {
  compute: { preTagger },
  methods: {
    fillTags: fns.fillTags,
    expandLexicon: fns.expandLexicon,
    addToLexicon: fns.addToLexicon,
    transform: fns.transform,
  },
  model: _model,
}
export default plugin
