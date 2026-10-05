import {
  NN, JJ, RB, Value, Expression, V, VBD, Fut, Pres, VBG, Cop, VB, Conj, PhrasalVerb,
} from './_lib.js'

export default {
  Verb: {
    not: [NN, JJ, RB, Value, Expression],
    alias: 'Vb'
  },
  // 'he [walks]'
  PresentTense: {
    is: V,
    not: [VBD, Fut],
    alias: 'Pres'
  },
  // 'will [walk]'
  Infinitive: {
    is: Pres,
    not: [VBG],
    alias: 'Inf'
  },
  // '[walk] now!'
  Imperative: {
    is: V,
    not: [VBD, VBG, Cop],
    alias: 'Imp'
  },
  // walking
  Gerund: {
    is: Pres,
    not: [Cop],
    alias: 'Ger'
  },
  // walked
  PastTense: {
    is: V,
    not: [Pres, VBG, Fut],
    alias: 'Past'
  },
  // will walk
  FutureTense: {
    is: V,
    not: [Pres, VBD],
    alias: 'Fut'
  },
  // is/was
  Copula: {
    is: V,
  },
  // '[could] walk'
  Modal: {
    is: V,
    not: [VB],
  },
  // 'awaken'
  Participle: {
    is: VBD,
  },
  // '[will have had] walked'
  Auxiliary: {
    is: V,
    not: [VBD, Pres, VBG, Conj],
    alias: 'Aux'
  },
  // 'walk out'
  PhrasalVerb: {
    is: V,
    alias: 'Phrasal'
  },
  // 'walk [out]'
  Particle: {
    is: PhrasalVerb,
    not: [VBD, Pres, Cop, VBG],
  },
  // 'walked by'
  Passive: {
    is: V,
  },
}
