module.exports = {
  Adjective: {},
  Comparable: {
    isA: 'Adjective'
  },
  Comparative: {
    isA: 'Adjective'
  },
  Superlative: {
    isA: 'Adjective'
  },

  NumberRange: {
    isA: 'Contraction'
  },
  Adverb: {},

  Currency: {},
  //glue
  Determiner: {},
  Conjunction: {},
  Preposition: {},
  QuestionWord: {},
  RelativeProunoun: {
    isA: 'Pronoun'
  },
  Expression: {},
  Abbreviation: {},
  Url: {},
  PhoneNumber: {},
  HashTag: {},
  AtMention: {
    is: 'Noun'
  },
  Emoji: {},
  Email: {},

  //non-exclusive
  Condition: {},
  VerbPhrase: {},
  Auxiliary: {},
  Negative: {},
  Contraction: {},

  TitleCase: {},
  CamelCase: {},
  UpperCase: {},
  Hyphenated: {},
  Acronym: {},
  ClauseEnd: {},

  // Quotes
  Quotation: {},
  StartQuotation: {
    isA: 'Quotation'
  },
  EndQuotation: {
    isA: 'Quotation'
  },
  StraightDoubleQuotes: {
    isA: 'Quotation'
  },
  StraightDoubleQuotesWide: {
    isA: 'Quotation'
  },
  StraightSingleQuotes: {
    isA: 'Quotation'
  },
  CommaDoubleQuotes: {
    isA: 'Quotation'
  },
  CommaSingleQuotes: {
    isA: 'Quotation'
  },
  CurlyDoubleQuotesReversed: {
    isA: 'Quotation'
  },
  CurlySingleQuotesReversed: {
    isA: 'Quotation'
  },
  LowCurlyDoubleQuotes: {
    isA: 'Quotation'
  },
  LowCurlyDoubleQuotesReversed: {
    isA: 'Quotation'
  },
  LowCurlySingleQuotes: {
    isA: 'Quotation'
  },
  AngleDoubleQuotes: {
    isA: 'Quotation'
  },
  AngleSingleQuotes: {
    isA: 'Quotation'
  },
  PrimeSingleQuotes: {
    isA: 'Quotation'
  },
  PrimeDoubleQuotes: {
    isA: 'Quotation'
  },
  PrimeTripleQuotes: {
    isA: 'Quotation'
  },
  LowPrimeDoubleQuotesReversed: {
    isA: 'Quotation'
  },
  //parentheses
  EndBracket: {},
  StartBracket: {}
};
