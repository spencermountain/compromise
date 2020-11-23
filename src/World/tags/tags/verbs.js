module.exports = {
  Verb: {
    notA: ['Noun', 'Adjective', 'Adverb', 'Value'],
  },
  // walks
  PresentTense: {
    isA: 'Verb',
    notA: ['PastTense', 'FutureTense'],
  },
  // neutral form - 'walk'
  Infinitive: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Gerund'],
  },
  // walking
  Gerund: {
    isA: 'PresentTense',
    notA: ['PastTense', 'Copula', 'FutureTense'],
  },
  // walked
  PastTense: {
    isA: 'Verb',
    notA: ['FutureTense'],
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
    notA: ['Infinitive'],
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
    isA: 'PastTense',
  },
  // show up
  PhrasalVerb: {
    isA: 'Verb',
  },
  //'up' part
  Particle: {
    isA: 'PhrasalVerb',
  },

  //this can be an adverb
  Auxiliary: {
    notA: ['Noun', 'Adjective', 'Value'],
  },
}
