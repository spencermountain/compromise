module.exports = {
  Verb: {
    notA: ['Noun', 'Adjective', 'Adverb', 'Value'],
  },
  // walks
  PresentTense: {
    isA: 'Verb',
    notA: ['PastTense', 'Copula'],
  },
  // neutral form - 'walk'
  Infinitive: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Gerund'],
  },
  // walking
  Gerund: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Copula'],
  },
  // walked
  PastTense: {
    isA: 'Verb',
  },
  // will walk
  FutureTense: {
    isA: 'Verb',
  },

  // is
  Copula: {
    isA: 'Verb',
  },
  // would have
  Modal: {
    isA: 'Verb',
  },
  // had walked
  PerfectTense: {
    isA: 'Verb',
    notA: 'Gerund',
  },
  Pluperfect: {
    isA: 'Verb',
  },
  // shown
  Participle: {
    isA: 'Verb',
  },
  // show up
  PhrasalVerb: {
    isA: 'Verb',
  },
  //'up' part
  Particle: {
    isA: 'PhrasalVerb',
  },
}
