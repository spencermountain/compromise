export default [
  // ==== Phrasal ====
  //'foo-up'
  { match: '(#Verb && @hasHyphen) up', tag: 'PhrasalVerb', reason: 'foo-up' },
  { match: '(#Verb && @hasHyphen) off', tag: 'PhrasalVerb', reason: 'foo-off' },
  { match: '(#Verb && @hasHyphen) over', tag: 'PhrasalVerb', reason: 'foo-over' },
  { match: '(#Verb && @hasHyphen) out', tag: 'PhrasalVerb', reason: 'foo-out' },
  // walk in on
  {
    match: '[#Verb (in|out|up|down|off|back)] (on|in)',
    ifNo: ['#Copula'],
    tag: 'PhrasalVerb Particle',
    reason: 'walk-in-on',
  },
  //fall over
  { match: '#PhrasalVerb [#PhrasalVerb]', group: 0, tag: 'Particle', reason: 'phrasal-particle' },
  // went on for
  { match: '(lived|went|crept|go) [on] for', group: 0, tag: 'PhrasalVerb', reason: 'went-on' },
  //back it up
  {
    match: '#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]',
    group: 0,
    tag: 'Adverb',
    reason: 'phrasal-pronoun-advb',
  },
]
