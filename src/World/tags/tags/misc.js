const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord']

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

  // Dates:
  //not a noun, but usually is
  Date: {
    notA: ['Verb', 'Conjunction', 'Adverb', 'Preposition', 'Adjective'],
  },
  Month: {
    isA: ['Date', 'Singular'],
    notA: ['Year', 'WeekDay', 'Time'],
  },
  WeekDay: {
    isA: ['Date', 'Noun'],
  },
  // '9:20pm'
  Time: {
    isA: ['Date'],
    notA: ['AtMention'],
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

  // what, who, why
  QuestionWord: {
    notA: ['Determiner'],
  },

  // peso, euro
  Currency: {
    isA: ['Noun'],
  },
  // ughh
  Expression: {
    notA: ['Noun', 'Adjective', 'Verb', 'Adverb'],
  },
  // dr.
  Abbreviation: {},

  // internet tags
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
  Emoticon: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },
  Email: {
    notA: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },

  //non-exclusive
  Acronym: {
    notA: ['Plural', 'RomanNumeral'],
  },
  Negative: {
    notA: ['Noun', 'Adjective', 'Value'],
  },
  // if, unless, were
  Condition: {
    notA: ['Verb', 'Adjective', 'Noun', 'Value'],
  },
}
