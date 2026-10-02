export default [
  // walk-up
  { match: '(#Verb && @hasHyphen) up', tag: 'PhrasalVerb', reason: 'foo-up' },
  // walk-off
  { match: '(#Verb && @hasHyphen) off', tag: 'PhrasalVerb', reason: 'foo-off' },
  // walk-over
  { match: '(#Verb && @hasHyphen) over', tag: 'PhrasalVerb', reason: 'foo-over' },
  // walk-out
  { match: '(#Verb && @hasHyphen) out', tag: 'PhrasalVerb', reason: 'foo-out' },
  // [walk in] on
  {
    match: '[#Verb (in|out|up|down|off|back)] (on|in)',
    group: 0,
    notIf: '#Copula',
    tag: 'PhrasalVerb Particle',
    reason: 'walk-in-on',
  },
  // went [on] for
  { match: '(lived|went|crept|go) [on] for', group: 0, tag: 'PhrasalVerb', reason: 'went-on' },
  // the curtains come down
  { match: '#Verb (up|down|in|on|for)$', tag: 'PhrasalVerb #Particle', notIf: '#PhrasalVerb', reason: 'come-down' },
  // work in the office
  { match: '#PhrasalVerb (in && #Particle) #Determiner', tag: '#Verb #Preposition #Determiner', unTag: 'PhrasalVerb', reason: 'work-in-the' },
  // back it [up]
  ...['up', 'down'].map(word => ({
    match: `#Verb (him|her|it|us|himself|herself|itself|everything|something) [${word}]`,
    group: 0,
    tag: 'Adverb',
    reason: 'phr-pron-adv',
  })),
  // runs [around] the lake
  {
    match: '#PhrasalVerb [around] the #Noun',
    group: 0,
    tag: 'Preposition', //(breaks the phrasal)
    reason: 'around-noun',
  },
]
