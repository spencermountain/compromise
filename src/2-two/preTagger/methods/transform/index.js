import toPlural from './nouns/toPlural/index.js'
import toSingular from './nouns/toSingular/index.js'

import toInfinitive from './verbs/toInfinitive/index.js'
import conjugate from './verbs/conjugate/index.js'
import getTense from './verbs/getTense/index.js'
import fromAdverb from './adverbs/toAdjective.js'
import toAdverb from './adverbs/toAdverb.js'
import toNoun from './adverbs/toNoun.js'


import { toSuperlative, toComparative, fromSuperlative, fromComparative } from './adjectives/index.js'

export default {
  noun: {
    toPlural, toSingular,
  },
  verb: {
    toInfinitive,
    conjugate,
  },
  getTense,

  adjective: {
    toSuperlative, toComparative, toAdverb, toNoun,
    fromAdverb, fromSuperlative, fromComparative,
  },

}
