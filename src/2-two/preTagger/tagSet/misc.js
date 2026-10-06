import {
  NN, V, JJ, RB, Value, QuestionWord, JJR, Conj, Det, Connector, IN, HashTag, SlashedTerm, Email,
  PhoneNumber, AtMention, Emoji, Emoticon, Url, RomanNumeral, PRP, Date, Expression, Abbreviation,
  Acronym, NNP,
} from './_lib.js'

const anything = [NN, V, JJ, RB, Value, QuestionWord]

export default {
  Adjective: {
    aliases: ['JJ'],
    not: [NN, V, RB, Value],
    alias: 'Adj'
  },
  Comparable: {
    is: JJ,
  },
  Comparative: {
    aliases: ['Comp', 'JJR'],
    is: JJ,
  },
  Superlative: {
    aliases: ['Sup', 'JJS'],
    is: JJ,
    not: [JJR],
  },
  NumberRange: {
    aliases: ['NumRange'],
  },
  Adverb: {
    aliases: ['RB'],
    not: [NN, V, JJ, Value],
    alias: 'Adv'
  },

  Determiner: {
    aliases: ['DT'],
    not: [NN, V, JJ, RB, QuestionWord, Conj], //allow 'a' to be a Determiner/Value
    alias: 'Det'
  },
  Connector: {
    not: [NN, V, JJ, RB, QuestionWord, Det],
  },
  Conjunction: {
    aliases: ['CC'],
    is: Connector,
    not: anything.concat([IN]),
    alias: 'Conj'
  },
  Preposition: {
    aliases: ['IN'],
    is: Connector,
    not: [NN, V, JJ, RB, QuestionWord, Det, Conj],
    alias: 'Prep'
  },
  QuestionWord: {
    aliases: ['QW'],
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
    aliases: ['Neg'],
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
