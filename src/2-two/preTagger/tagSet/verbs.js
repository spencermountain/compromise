export default {
  Verb: {
    not: ['Noun', 'Adjective', 'Adverb', 'Value', 'Expression'],
    alias: 'Vb'
  },
  // 'he [walks]'
  PresentTense: {
    is: 'Verb',
    not: ['PastTense', 'FutureTense'],
    alias: 'Pres'
  },
  // 'will [walk]'
  Infinitive: {
    is: 'PresentTense',
    not: ['Gerund'],
    alias: 'Inf'
  },
  // '[walk] now!'
  Imperative: {
    is: 'Verb',
    not: ['PastTense', 'Gerund', 'Copula'],
    alias: 'Imp'
  },
  // walking
  Gerund: {
    is: 'PresentTense',
    not: ['Copula'],
    alias: 'Ger'
  },
  // walked
  PastTense: {
    is: 'Verb',
    not: ['PresentTense', 'Gerund', 'FutureTense'],
    alias: 'Past'
  },
  // will walk
  FutureTense: {
    is: 'Verb',
    not: ['PresentTense', 'PastTense'],
    alias: 'Fut'
  },
  // is/was
  Copula: {
    is: 'Verb',
  },
  // '[could] walk'
  Modal: {
    is: 'Verb',
    not: ['Infinitive'],
  },
  // 'awaken'
  Participle: {
    is: 'PastTense',
  },
  // '[will have had] walked'
  Auxiliary: {
    is: 'Verb',
    not: ['PastTense', 'PresentTense', 'Gerund', 'Conjunction'],
    alias: 'Aux'
  },
  // 'walk out'
  PhrasalVerb: {
    is: 'Verb',
    alias: 'Phrasal'
  },
  // 'walk [out]'
  Particle: {
    is: 'PhrasalVerb',
    not: ['PastTense', 'PresentTense', 'Copula', 'Gerund'],
  },
  // 'walked by'
  Passive: {
    is: 'Verb',
  },
}
