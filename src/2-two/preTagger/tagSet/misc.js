const anything = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Value', 'QuestionWord']

export default {
  Adjective: {
    not: ['Noun', 'Verb', 'Adverb', 'Value'],
    alias: 'Adj'
  },
  Comparable: {
    is: 'Adjective',
  },
  Comparative: {
    is: 'Adjective',
  },
  Superlative: {
    is: 'Adjective',
    not: ['Comparative'],
  },
  NumberRange: {},
  Adverb: {
    not: ['Noun', 'Verb', 'Adjective', 'Value'],
    alias: 'Adv'
  },

  Determiner: {
    not: ['Noun', 'Verb', 'Adjective', 'Adverb', 'QuestionWord', 'Conjunction'], //allow 'a' to be a Determiner/Value
    alias: 'Det'
  },
  Connector: {
    not: ['Noun', 'Verb', 'Adjective', 'Adverb', 'QuestionWord', 'Determiner'],
  },
  Conjunction: {
    is: 'Connector',
    not: anything.concat(['Preposition']),
    alias: 'Conj'
  },
  Preposition: {
    is: 'Connector',
    not: ['Noun', 'Verb', 'Adjective', 'Adverb', 'QuestionWord', 'Determiner', 'Conjunction'],
    alias: 'Prep'
  },
  QuestionWord: {
    not: ['Determiner'],
  },
  Currency: {
    is: 'Noun',
  },
  Expression: {
    not: ['Noun', 'Adjective', 'Verb', 'Adverb'],
    alias: 'Expr'
  },
  Abbreviation: {
    alias: 'Abbr'
  },
  Url: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'SlashedTerm', 'Email', 'PhoneNumber', 'AtMention', 'Emoji', 'Emoticon'],
  },
  PhoneNumber: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'AtMention', 'Emoji', 'Emoticon'],
  },
  HashTag: {},
  AtMention: {
    is: 'Noun',
    not: ['HashTag', 'Emoji', 'Emoticon'],
  },
  Emoji: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'Emoticon'],
  },
  Emoticon: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'SlashedTerm'],
  },
  SlashedTerm: {
    not: ['Emoticon', 'Url', 'Value']
  },
  Email: {
    not: ['HashTag', 'Verb', 'Adjective', 'Value', 'PhoneNumber', 'AtMention', 'Emoji', 'Emoticon'],
  },
  Acronym: {
    not: ['RomanNumeral', 'Pronoun', 'Date'],
  },
  Negative: {
    not: ['Noun', 'Adjective', 'Value', 'Expression'],
  },
  Condition: {
    is: 'Connector',
    not: ['Verb', 'Adjective', 'Noun', 'Value'],
  },
  // existential 'there'
  There: {
    not: ['Verb', 'Adjective', 'Noun', 'Value', 'Conjunction', 'Preposition'],
  },
  // 'co-wrote'
  Prefix: {
    not: ['Abbreviation', 'Acronym', 'ProperNoun'],
  },
  // hard-nosed, bone-headed
  Hyphenated: {},
}
