const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord']

module.exports = {
  //--Adjectives--
  Adjective: {
    not: ['Noun', 'Verb', 'Adverb', 'Value'],
  },
  // adjectives that can conjugate
  Comparable: {
    parents: ['Adjective'],
  },
  // better
  Comparative: {
    parents: ['Adjective'],
  },
  // best
  Superlative: {
    parents: ['Adjective'],
    not: ['Comparative'],
  },

  NumberRange: {
    //parents: ['Contraction'],
  },
  Adverb: {
    not: ['Noun', 'Verb', 'Adjective', 'Value'],
  },

  // Dates:
  //not a noun, but usually is
  Date: {
    not: ['Verb', 'Adverb', 'Preposition', 'Adjective'],
  },
  Month: {
    parents: ['Date', 'Singular'],
    not: ['Year', 'WeekDay', 'Time'],
  },
  WeekDay: {
    parents: ['Date', 'Noun'],
  },
  // 'PST'
  Timezone: {
    parents: ['Date', 'Noun'],
    not: ['Adjective', 'ProperNoun'],
  },
  // '9:20pm'
  Time: {
    parents: ['Date'],
    not: ['AtMention'],
  },

  //glue
  Determiner: {
    not: anything,
  },
  Conjunction: {
    not: anything,
  },
  Preposition: {
    not: anything,
  },

  // what, who, why
  QuestionWord: {
    not: ['Determiner'],
  },

  // peso, euro
  Currency: {
    parents: ['Noun'],
  },
  // ughh
  Expression: {
    not: ['Noun', 'Adjective', 'Verb', 'Adverb'],
  },
  // dr.
  Abbreviation: {},

  // internet tags
  Url: {
    not: ['HashTag', 'PhoneNumber', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
  },
  PhoneNumber: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Email'],
  },
  HashTag: {},
  AtMention: {
    parents: ['Noun'],
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'Email'],
  },
  Emoji: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },
  Emoticon: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },
  Email: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention'],
  },

  //non-exclusive
  Acronym: {
    not: ['Plural', 'RomanNumeral'],
  },
  Negative: {
    not: ['Noun', 'Adjective', 'Value'],
  },
  // if, unless, were
  Condition: {
    not: ['Verb', 'Adjective', 'Noun', 'Value'],
  },
}
