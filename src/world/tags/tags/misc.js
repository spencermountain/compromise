const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value']

module.exports = {
  //--Adjectives--
  Adjective: {
    notA: ['Noun', 'Verb', 'Adverb', 'Value'],
  },
  // adjectives that can conjugate
  Comparable: {
    isA: ['Adjective'],
  },
  // better
  Comparative: {
    isA: ['Adjective'],
  },
  // best
  Superlative: {
    isA: ['Adjective'],
    notA: ['Comparative'],
  },

  NumberRange: {
    isA: ['Contraction'],
  },
  Adverb: {
    notA: ['Noun', 'Verb', 'Adjective', 'Value'],
  },

  //glue
  Determiner: {
    notA: anything,
  },
  Conjunction: {
    notA: anything,
  },
  Preposition: {
    notA: anything,
  },

  QuestionWord: {},
  RelativeProunoun: {
    isA: ['Pronoun'],
  },
  Currency: {},
  Expression: {},
  Abbreviation: {},
  Url: {},
  PhoneNumber: {},
  HashTag: {},
  AtMention: {
    isA: ['Noun'],
  },
  Emoji: {},
  Email: {},

  //non-exclusive
  Auxiliary: {},
  Negative: {},
}
