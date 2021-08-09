import checkLexicon from './tagger/01-lexicon.js'
import checkSuffix from './tagger/02-suffix.js'
import checkRegex from './tagger/03-regex.js'
import checkCase from './tagger/04-case.js'
import checkAcronym from './tagger/05-acronym.js'
import checkPrefix from './tagger/06-prefix.js'
import nounFallback from './tagger/07-fallback.js'
import fillTags from './tagger/08-fillTags.js'

import nounToPlural from './transform/nouns/toPlural/index.js'
import nounToSingular from './transform/nouns/toSingular/index.js'

import verbToInfinitive from './transform/verbs/toInfinitive/index.js'
import verbConjugate from './transform/verbs/conjugate/index.js'

import adjToSuperlative from './transform/adjectives/toSuperlative.js'
import adjToComparative from './transform/adjectives/toComparative.js'
import expandLexicon from './expand/index.js'

const addToLexicon = function (lex, world) {
  const { methods, model } = world
  let fixed = {}
  // normalize lexicon a little bit
  Object.keys(lex).forEach(k => {
    let norm = k.toLowerCase().trim()
    fixed[norm] = lex[k]
  })
  Object.assign(world.model.two.lexicon, fixed)
  if (methods.two.expandLexicon) {
    methods.two.expandLexicon(model, methods)
  }
}

export default {
  // preTagger: {
  checkLexicon,
  checkSuffix,
  checkRegex,
  checkCase,
  checkAcronym,
  checkPrefix,
  nounFallback,
  fillTags,
  expandLexicon,
  addToLexicon,
  // },
  transform: {
    nounToPlural,
    nounToSingular,
    verbToInfinitive,
    verbConjugate,
    adjToSuperlative,
    adjToComparative,
  },
}
