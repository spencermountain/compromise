import {
  NN, V, JJ, RB, Value, QuestionWord, JJR, Conj, Det, Connector, IN, HashTag, SlashedTerm, Email,
  PhoneNumber, AtMention, Emoji, Emoticon, Url, RomanNumeral, PRP, Date, Expression, Abbreviation,
  Acronym, NNP,
} from './_lib.js'

const anything = [NN, V, JJ, RB, Value, QuestionWord]

export default {
  Adjective: {
    not: [NN, V, RB, Value],
    alias: 'Adj'
  },
  Comparable: {
    is: JJ,
  },
  Comparative: {
    is: JJ,
  },
  Superlative: {
    is: JJ,
    not: [JJR],
  },
  NumberRange: {},
  Adverb: {
    not: [NN, V, JJ, Value],
    alias: 'Adv'
  },

  Determiner: {
    not: [NN, V, JJ, RB, QuestionWord, Conj], //allow 'a' to be a Determiner/Value
    alias: 'Det'
  },
  Connector: {
    not: [NN, V, JJ, RB, QuestionWord, Det],
  },
  Conjunction: {
    is: Connector,
    not: anything.concat([IN]),
    alias: 'Conj'
  },
  Preposition: {
    is: Connector,
    not: [NN, V, JJ, RB, QuestionWord, Det, Conj],
    alias: 'Prep'
  },
  QuestionWord: {
    not: [Det],
  },
  Currency: {
    is: NN,
  },
  Expression: {
    not: [NN, JJ, V, RB],
    alias: 'Expr'
  },
  Abbreviation: {
    alias: 'Abbr'
  },
  Url: {
    not: [HashTag, V, JJ, Value, SlashedTerm, Email, PhoneNumber, AtMention, Emoji, Emoticon],
  },
  PhoneNumber: {
    not: [HashTag, V, JJ, Value, AtMention, Emoji, Emoticon],
  },
  HashTag: {},
  AtMention: {
    is: NN,
    not: [HashTag, Emoji, Emoticon],
  },
  Emoji: {
    not: [HashTag, V, JJ, Value, Emoticon],
  },
  Emoticon: {
    not: [HashTag, V, JJ, Value, SlashedTerm],
  },
  SlashedTerm: {
    not: [Emoticon, Url, Value]
  },
  Email: {
    not: [HashTag, V, JJ, Value, PhoneNumber, AtMention, Emoji, Emoticon],
  },
  Acronym: {
    not: [RomanNumeral, PRP, Date],
  },
  Negative: {
    not: [NN, JJ, Value, Expression],
  },
  Condition: {
    is: Connector,
    not: [V, JJ, NN, Value],
  },
  // existential 'there'
  There: {
    not: [V, JJ, NN, Value, Conj, IN],
  },
  // 'co-wrote'
  Prefix: {
    not: [Abbreviation, Acronym, NNP],
  },
  // hard-nosed, bone-headed
  Hyphenated: {},
}
