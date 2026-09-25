export default [
  // ==== Phrasal ====
  // walk-up
  { match: '(#Verb && @hasHyphen) up', hook: 'up', tag: 'PhrasalVerb', reason: 'foo-up' },
  // walk-off
  { match: '(#Verb && @hasHyphen) off', hook: 'off', tag: 'PhrasalVerb', reason: 'foo-off' },
  // walk-over
  { match: '(#Verb && @hasHyphen) over', hook: 'over', tag: 'PhrasalVerb', reason: 'foo-over' },
  // walk-out
  { match: '(#Verb && @hasHyphen) out', hook: 'out', tag: 'PhrasalVerb', reason: 'foo-out' },
  // walk in on
  {
    match: '[#Verb (in|out|up|down|off|back)] (on|in)', hook: '#Verb',
    notIf: '#Copula',
    tag: 'PhrasalVerb Particle',
    reason: 'walk-in-on',
  },
  // went on for
  { match: '(lived|went|crept|go) [on] for', hook: 'on', group: 0, tag: 'PhrasalVerb', reason: 'went-on' },
  // the curtains come down
  { match: '#Verb (up|down|in|on|for)$', hook: '#Verb', tag: 'PhrasalVerb #Particle', notIf: '#PhrasalVerb', reason: 'come-down$' },
  // got me thinking
  // { match: '(got|had) me [#Noun]', group: 0, tag: 'Verb', reason: 'got-me-gerund' },
  // help stop
  { match: 'help [(stop|end|make|start)]', hook: 'help', group: 0, tag: 'Infinitive', reason: 'help-stop' },
  // work in the office
  { match: '#PhrasalVerb (in && #Particle) #Determiner', hook: 'in', tag: '#Verb #Preposition #Determiner', unTag: 'PhrasalVerb', reason: 'work-in-the' },
  // start listening
  { match: '[(stop|start|finish|help)] #Gerund', hook: '#Gerund', group: 0, tag: 'Infinitive', reason: 'start-listening' },
  // mis-fired
  // { match: '[(mis)] #Verb', group: 0, tag: 'Verb', reason: 'mis-firedsa' },
  // back it up
  {
    match: '#Verb (him|her|it|us|himself|herself|itself|everything|something) [(up|down)]', hook: '#Verb',
    group: 0,
    tag: 'Adverb',
    reason: 'phrasal-pronoun-advb',
  },
  // runs around the lake
  {
    match: '#PhrasalVerb [around] the #Noun',
    hook: 'around',
    group: 0,
    tag: 'Preposition', //(breaks the phrasal)
    reason: 'around-the-noun',
  },
]
