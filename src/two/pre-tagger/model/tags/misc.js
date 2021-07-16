const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord']

export default {
  Adjective: {
    not: ['Noun', 'Verb', 'Adverb', 'Value'],
  },
  Comparable: {
    parents: ['Adjective'],
  },
  Comparative: {
    parents: ['Adjective'],
  },
  Superlative: {
    parents: ['Adjective'],
    not: ['Comparative'],
  },
  NumberRange: {},
  Adverb: {
    not: ['Noun', 'Verb', 'Adjective', 'Value'],
  },
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
  Timezone: {
    parents: ['Date', 'Noun'],
    not: ['Adjective', 'ProperNoun'],
  },
  Time: {
    parents: ['Date'],
    not: ['AtMention'],
  },
  // 'months'
  Duration: {
    parents: ['Date', 'Noun'],
  },
  Determiner: {
    not: ['Noun', 'Verb', 'Adjective', 'Adverb', 'QuestionWord'], //allow 'a' to be a Determiner/Value
  },
  Conjunction: {
    not: anything,
  },
  Preposition: {
    not: anything,
  },
  QuestionWord: {
    not: ['Determiner'],
  },
  Currency: {
    parents: ['Noun'],
  },
  Expression: {
    not: ['Noun', 'Adjective', 'Verb', 'Adverb'],
  },
  Abbreviation: {},
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
  Acronym: {
    not: ['Plural', 'RomanNumeral'],
  },
  Negative: {
    not: ['Noun', 'Adjective', 'Value'],
  },
  Condition: {
    not: ['Verb', 'Adjective', 'Noun', 'Value'],
  },
}
