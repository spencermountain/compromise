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
    isA: 'Verb',
    notA: ['PastTense'],
  },
  // walking
  Gerund: {
    isA: 'PresentTense',
  },
  // walked
  PastTense: {
    isA: 'Verb',
  },
  PerfectTense: {
    isA: 'Verb',
  },
  Pluperfect: {
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
