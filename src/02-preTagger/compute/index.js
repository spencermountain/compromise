// import methods from '../methods/index.js'
import tagRank from './tagRank.js'

const preTagger = function (document, world) {
  const { model, methods } = world
  const tagger = methods.two.tagger

  // start with all terms
  for (let n = 0; n < document.length; n += 1) {
    let terms = document[n]
    // lookup known words
    tagger.checkLexicon(terms, model)
    // look for a starting tag
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      let found = term.tags.size > 0
      // look at word ending
      found = found || tagger.checkSuffix(term, model)
      //  fallback methods
      tagger.checkCase(term, i)
      // check for stem in lexicon
      found = found || tagger.checkPrefix(term, model)
      // try look-like rules
      tagger.checkRegex(term, model)
      // more-involved regexes
      tagger.checkAcronym(term, model)
    }
    //  ¯\_(ツ)_/¯ - found nothing
    tagger.nounFallback(terms, model)
    // deduce parent tags
    tagger.fillTags(terms, model)
  }
  return document
}
export default { preTagger, tagRank }
