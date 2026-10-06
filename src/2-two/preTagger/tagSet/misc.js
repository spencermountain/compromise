import {
  NN,
  Vb,
  Adj,
  Adv,
  Val,
  QW,
  Comp,
  Conj,
  Det,
  Connector,
  Prep,
  HashTag,
  SlashedTerm,
  Email,
  PhoneNumber,
  AtMention,
  Emoji,
  Emoticon,
  Url,
  RomanNumeral,
  Pron,
  Date,
  Expr,
  Abbr,
  Acronym,
  Prop,
} from './_lib.js'

const anything = [NN, Vb, Adj, Adv, Val, QW]

export default {
  Adjective: {
    aliases: ['Adj', 'JJ', 'ADJ'],
    not: [NN, Vb, Adv, Val],
  },
  Comparable: {
    is: Adj,
  },
  Comparative: {
    aliases: [null, 'Comp', 'JJR'],
    is: Adj,
  },
  Superlative: {
    aliases: [null, 'Sup', 'JJS'],
    is: Adj,
    not: [Comp],
  },
  NumberRange: {
    aliases: [null, 'NumRange'],
  },
  Adverb: {
    aliases: ['Adv', 'RB', 'ADV'],
    not: [NN, Vb, Adj, Val],
  },

  Determiner: {
    aliases: ['Det', 'DT', 'DET'],
    not: [NN, Vb, Adj, Adv, QW, Conj], //allow 'a' to be a Determiner/Value
  },
  Connector: {
    not: [NN, Vb, Adj, Adv, QW, Det],
  },
  Conjunction: {
    aliases: ['Conj', 'CC'],
    is: Connector,
    not: anything.concat([Prep]),
  },
  Preposition: {
    aliases: ['Prep', 'IN', 'ADP'],
    is: Connector,
    not: [NN, Vb, Adj, Adv, QW, Det, Conj],
  },
  QuestionWord: {
    aliases: [null, 'QW'],
    not: [Det],
  },
  Currency: {
    is: NN,
  },
  Expression: {
    aliases: ['Expr'],
    not: [NN, Adj, Vb, Adv],
  },
  Abbreviation: {
    aliases: ['Abbr'],
  },
  Url: {
    aliases: [null, 'URL'],
    not: [HashTag, Vb, Adj, Val, SlashedTerm, Email, PhoneNumber, AtMention, Emoji, Emoticon],
  },
  PhoneNumber: {
    not: [HashTag, Vb, Adj, Val, AtMention, Emoji, Emoticon],
  },
  HashTag: {},
  AtMention: {
    is: NN,
    not: [HashTag, Emoji, Emoticon],
  },
  Emoji: {
    not: [HashTag, Vb, Adj, Val, Emoticon],
  },
  Emoticon: {
    not: [HashTag, Vb, Adj, Val, SlashedTerm],
  },
  SlashedTerm: {
    not: [Emoticon, Url, Val]
  },
  Email: {
    not: [HashTag, Vb, Adj, Val, PhoneNumber, AtMention, Emoji, Emoticon],
  },
  Acronym: {
    not: [RomanNumeral, Pron, Date],
  },
  Negative: {
    aliases: [null, 'Neg'],
    not: [NN, Adj, Val, Expr],
  },
  Condition: {
    is: Connector,
    aliases: [null, 'Cond'],
    not: [Vb, Adj, NN, Val],
  },
  // existential 'there'
  There: {
    aliases: [null, 'EX'],
    not: [Vb, Adj, NN, Val, Conj, Prep],
  },
  // 'co-wrote'
  Prefix: {
    not: [Abbr, Acronym, Prop],
  },
  // hard-nosed, bone-headed
  Hyphenated: {},
}
