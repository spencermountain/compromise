import nounToPlural from './nouns/toPlural/index.js'
import nounToSingular from './nouns/toSingular/index.js'

import verbToInfinitive from './verbs/toInfinitive/index.js'
import verbConjugate from './verbs/conjugate/index.js'
import getTense from './verbs/getTense/index.js'

import adjToSuperlative from './adjectives/toSuperlative.js'
import adjToComparative from './adjectives/toComparative.js'

export default {
  nounToPlural, nounToSingular,
  verbToInfinitive, getTense,
  verbConjugate, adjToSuperlative, adjToComparative
}
