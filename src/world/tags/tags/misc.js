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

  QuestionWord: {
    notA: ['Determiner'],
  },
  RelativeProunoun: {
    isA: ['Pronoun'],
  },
  Currency: {},
  Expression: {},
  Abbreviation: {},

  Url: {
    notA: ['HashTag', 'PhoneNumber', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
  },
  PhoneNumber: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
  },
  HashTag: {},
  AtMention: {
    isA: ['Noun'],
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'Email'],
  },
  Emoji: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },
  Email: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },

  //non-exclusive
  Auxiliary: {
    notA: ['Noun', 'Adjective', 'Value'],
  },
  Acronym: {
    notA: ['Plural', 'RomanNumeral'],
  },
  Negative: {
    notA: ['Noun', 'Adjective', 'Value'],
  },
}
