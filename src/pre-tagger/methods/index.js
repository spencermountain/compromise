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

export default {
  checkLexicon,
  checkSuffix,
  checkRegex,
  checkCase,
  checkAcronym,
  checkPrefix,
  nounFallback,
  fillTags,
  nounToPlural,
  nounToSingular,
  verbToInfinitive,
  verbConjugate,
  adjToSuperlative,
  adjToComparative,
  expandLexicon,
}
