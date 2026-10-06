import { NN, Adj, Adv, Val, Expr, Vb, Past, Fut, Pres, Ger, Cop, Inf, Conj, Phrasal } from './_lib.js'

export default {
  Verb: {
    aliases: ['Vb', 'V', 'VB'],
    not: [NN, Adj, Adv, Val, Expr],
  },
  // 'he [walks]'
  PresentTense: {
    aliases: ['Pres', 'PRS'],
    is: Vb,
    not: [Past, Fut],
  },
  // 'will [walk]'
  Infinitive: {
    aliases: ['Inf', 'VVI'],
    is: Pres,
    not: [Ger],
  },
  // '[walk] now!'
  Imperative: {
    aliases: ['Imp'],
    is: Vb,
    not: [Past, Ger, Cop],
  },
  // walking
  Gerund: {
    aliases: ['Ger', 'VBG'],
    is: Pres,
    not: [Cop],
  },
  // walked
  PastTense: {
    aliases: ['Past', 'VBD', 'PST'],
    is: Vb,
    not: [Pres, Ger, Fut],
  },
  // will walk
  FutureTense: {
    aliases: ['Fut'],
    is: Vb,
    not: [Pres, Past],
  },
  // is/was
  Copula: {
    aliases: [null, 'Cop'],
    is: Vb,
  },
  // '[could] walk'
  Modal: {
    aliases: [null, 'Mod', 'MD'],
    is: Vb,
    not: [Inf],
  },
  // 'awaken'
  Participle: {
    aliases: [null, 'VBN'],
    is: Past,
  },
  // '[will have had] walked'
  Auxiliary: {
    aliases: ['Aux'],
    is: Vb,
    not: [Past, Pres, Ger, Conj],
  },
  // 'walk out'
  PhrasalVerb: {
    aliases: ['Phrasal', 'PhrV'],
    is: Vb,
  },
  // 'walk [out]'
  Particle: {
    aliases: [null, 'RP'],
    is: Phrasal,
    not: [Past, Pres, Cop, Ger],
  },
  // 'walked by'
  Passive: {
    aliases: [null, 'Pass'],
    is: Vb,
  },
}
