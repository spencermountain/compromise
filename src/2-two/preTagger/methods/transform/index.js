import toPlural from './nouns/toPlural/index.js'
import toSingular from './nouns/toSingular/index.js'

import toInfinitive from './verbs/toInfinitive/index.js'
import { conjugate, all as allVerb } from './verbs/conjugate/index.js'

import { toSuperlative, toComparative, fromSuperlative, fromComparative, all as allAdj } from './adjectives/index.js'

import fromAdverb from './adverbs/toAdjective.js'
import toAdverb from './adverbs/toAdverb.js'
import toNoun from './adverbs/toNoun.js'

export default {
  noun: {
    toPlural, toSingular,
    all: toPlural
  },
  verb: {
    toInfinitive,
    conjugate,
    all: allVerb
  },
  adjective: {
    toSuperlative, toComparative, toAdverb, toNoun,
    fromAdverb, fromSuperlative, fromComparative,
    all: allAdj,
  }
}
