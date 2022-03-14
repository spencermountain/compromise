// this is really hard to do
const notIf = ['i', 'we', 'they'] //we do not go
export default [
  // do not go
  { match: '^do not? [#Infinitive #Particle?]', notIf, group: 0, tag: 'Imperative', reason: 'do-eat' },
  // please go
  { match: '^please do? not? [#Infinitive #Particle?]', group: 0, tag: 'Imperative', reason: 'please-go' },
  // just go
  { match: '^just do? not? [#Infinitive #Particle?]', group: 0, tag: 'Imperative', reason: 'just-go' },
  // do it better
  { match: '^[#Infinitive] it #Comparative', notIf, group: 0, tag: 'Imperative', reason: 'do-it-better' },
  // do it again
  { match: '^[#Infinitive] it (please|now|again|plz)', notIf, group: 0, tag: 'Imperative', reason: 'do-it-please' },
  // go!
  // { match: '^[#Infinitive]$', group: 0, tag: 'Imperative', reason: 'go' },
  // go quickly.
  { match: '^[#Infinitive] (#Adjective|#Adverb)$', group: 0, tag: 'Imperative', ifNo: ['so', 'such', 'rather', 'enough'], reason: 'go-quickly' },
  // turn down the noise
  { match: '^[#Infinitive] (up|down|over) #Determiner', group: 0, tag: 'Imperative', reason: 'turn-down' },
  // eat my shorts
  { match: '^[#Infinitive] (your|my|the|some|a|an)', group: 0, tag: 'Imperative', reason: 'eat-my-shorts' },
  // tell him the story
  { match: '^[#Infinitive] (him|her|it|us|me)', group: 0, tag: 'Imperative', reason: 'tell-him' },
  // one-word imperatives
  { match: '^(go|stop|wait|hurry) please?$', tag: 'Imperative', reason: 'go' },
  // somebody call
  { match: '^(somebody|everybody) [#Infinitive]', group: 0, tag: 'Imperative', reason: 'somebody-call' },
  // let's leave
  { match: '^let (us|me) [#Infinitive]', group: 0, tag: 'Imperative', reason: 'lets-leave' },
  // shut the door
  { match: '^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun', group: 0, tag: 'Imperative', reason: 'shut-the-door' },
  // go to toronto
  { match: '^[go] to .', group: 0, tag: 'Imperative', reason: 'go-to-toronto' },
  // never say
  { match: '^never [#Infinitive]', group: 0, tag: 'Imperative', reason: 'never-stop' },
  // stay away
  { match: '^stay (out|away|back)', tag: 'Imperative', reason: 'stay-away' },
  // stay cool
  { match: '^[stay] #Adjective', tag: 'Imperative', reason: 'stay-cool' },
  // keep it silent
  { match: '^[keep it] #Adjective', group: 0, tag: 'Imperative', reason: 'keep-it-cool' },
  // don't be late
  { match: '^do not [#Infinitive]', group: 0, tag: 'Imperative', reason: 'do-not-be' },
  // allow yourself
  { match: '[#Infinitive] (yourself|yourselves)', group: 0, tag: 'Imperative', reason: 'allow-yourself' },
]