import methods from '../methods/index.js'

const preTagger = function (document, model) {
  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // lookup known words
    methods.checkLexicon(terms, model)
    // look for a starting tag
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = term.tags.size > 0
      // look at word ending
      found = found || methods.checkSuffix(term, model)
      //  fallback methods
      methods.checkCase(term, i)
      // check for stem in lexicon
      found = found || methods.checkPrefix(term, model)
      // try look-like rules
      methods.checkRegex(term, model)
      // more-involved regexes
      methods.checkAcronym(term, model)
    }
    //  ¯\_(ツ)_/¯ - found nothing
    methods.nounFallback(terms, model)
    // deduce parent tags
    methods.fillTags(terms, model)
  }
  return document
}
export default { preTagger }
