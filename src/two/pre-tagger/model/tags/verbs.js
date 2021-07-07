export default {
  Verb: {
    not: ['Noun', 'Adjective', 'Adverb', 'Value', 'Expression'],
  },
  PresentTense: {
    parents: 'Verb',
    not: ['PastTense', 'FutureTense'],
  },
  Infinitive: {
    parents: 'PresentTense',
    not: ['PastTense', 'Gerund'],
  },
  Imperative: {
    parents: 'Infinitive',
  },
  Gerund: {
    parents: 'PresentTense',
    not: ['PastTense', 'Copula', 'FutureTense'],
  },
  PastTense: {
    parents: 'Verb',
    not: ['FutureTense'],
  },
  FutureTense: {
    parents: 'Verb',
  },
  Copula: {
    parents: 'Verb',
  },
  Modal: {
    parents: 'Verb',
    not: ['Infinitive'],
  },
  PerfectTense: {
    parents: 'Verb',
    not: 'Gerund',
  },
  Pluperfect: {
    parents: 'Verb',
  },
  Participle: {
    parents: 'PastTense',
  },
  PhrasalVerb: {
    parents: 'Verb',
  },
  Particle: {
    parents: 'PhrasalVerb',
    not: ['PastTense', 'PresentTense', 'FutureTense', 'Copula', 'FutureTense', 'Gerund'],
  },
  Auxiliary: {
    not: ['Noun', 'Adjective', 'Value'],
  },
}
