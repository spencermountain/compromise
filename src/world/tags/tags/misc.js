module.exports = {
  Adjective: {},
  Comparable: {
    isA: 'Adjective',
  },
  Comparative: {
    isA: 'Adjective',
  },
  Superlative: {
    isA: 'Adjective',
  },

  NumberRange: {
    isA: 'Contraction',
  },
  Adverb: {},

  Currency: {},
  //glue
  Determiner: {},
  Conjunction: {},
  Preposition: {},
  QuestionWord: {},
  RelativeProunoun: {
    isA: 'Pronoun',
  },
  Expression: {},
  Abbreviation: {},
  Url: {},
  PhoneNumber: {},
  HashTag: {},
  AtMention: {
    isA: 'Noun',
  },
  Emoji: {},
  Email: {},

  //non-exclusive
  Auxiliary: {},
  Negative: {},
  Contraction: {},

  TitleCase: {},
  Hyphenated: {},
  Acronym: {},

  // Quotes
  Quotation: {},
  //parentheses
  Parentheses: {},
}
