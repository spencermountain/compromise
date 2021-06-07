module.exports = {
  Verb: {
    not: ['Noun', 'Adjective', 'Adverb', 'Value', 'Expression'],
  },
  // walks
  PresentTense: {
    parents: 'Verb',
    not: ['PastTense', 'FutureTense'],
  },
  // neutral form - 'walk'
  Infinitive: {
    parents: 'PresentTense',
    not: ['PastTense', 'Gerund'],
  },
  //close the door!
  Imperative: {
    parents: 'Infinitive',
  },
  // walking
  Gerund: {
    parents: 'PresentTense',
    not: ['PastTense', 'Copula', 'FutureTense'],
  },
  // walked
  PastTense: {
    parents: 'Verb',
    not: ['FutureTense'],
  },
  // will walk
  FutureTense: {
    parents: 'Verb',
  },

  // is
  Copula: {
    parents: 'Verb',
  },
  // would have
  Modal: {
    parents: 'Verb',
    not: ['Infinitive'],
  },
  // had walked
  PerfectTense: {
    parents: 'Verb',
    not: 'Gerund',
  },
  Pluperfect: {
    parents: 'Verb',
  },
  // shown
  Participle: {
    parents: 'PastTense',
  },
  // show up
  PhrasalVerb: {
    parents: 'Verb',
  },
  //'up' part
  Particle: {
    parents: 'PhrasalVerb',
  },

  //this can be an adverb
  Auxiliary: {
    not: ['Noun', 'Adjective', 'Value'],
  },
}
