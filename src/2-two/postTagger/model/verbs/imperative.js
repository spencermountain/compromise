// this is really hard to do
const notIf = ['i', 'we', 'they'] //we do not go
export default [

  // do not go
  { match: '^do not? [#Infinitive #Particle?]', notIf, group: 0, tag: 'Imperative', reason: 'do-eat' },
  // please go
  { match: '^please do? not? [#Infinitive #Particle?]', group: 0, tag: 'Imperative', reason: 'please-go' },
  // do it better
  { match: '^[#Infinitive] it #Comparative', notIf, group: 0, tag: 'Imperative', reason: 'do-it-better' },
  // do it again
  { match: '^[#Infinitive] it (please|now|again|plz)', notIf, group: 0, tag: 'Imperative', reason: 'do-it-please' },
  // go!
  // { match: '^[#Infinitive]$', group: 0, tag: 'Imperative', reason: 'go' },
  { match: '^[#Infinitive] (#Adjective|#Adverb)$', group: 0, tag: 'Imperative', reason: 'go' },
  // turn down the noise
  { match: '^[#Infinitive] (up|down|over) #Determiner', group: 0, tag: 'Imperative', reason: 'turn-down' },
  // eat my shorts
  { match: '^[#Infinitive] (your|my|the|some|a|an)', group: 0, tag: 'Imperative', reason: 'eat-my-shorts' },
]