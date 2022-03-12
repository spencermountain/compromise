import nounToPlural from './nouns/toPlural/index.js'
import nounToSingular from './nouns/toSingular/index.js'

import verbToInfinitive from './verbs/toInfinitive/index.js'
import verbConjugate from './verbs/conjugate/index.js'
import getTense from './verbs/getTense/index.js'
import advToAdjective from './adverbs/toAdjective.js'
import adjToAdverb from './adverbs/toAdverb.js'
import adjToNoun from './adverbs/toNoun.js'


import { adjToSuperlative, adjToComparative, adjFromSuperlative, adjFromComparative } from './adjectives/index.js'

export default {
  nounToPlural, nounToSingular,
  verbToInfinitive, getTense,
  verbConjugate,

  adjToSuperlative, adjToComparative, adjFromSuperlative, adjFromComparative,

  advToAdjective, adjToAdverb, adjToNoun
}
