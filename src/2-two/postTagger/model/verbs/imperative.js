// this is really hard to do
const notIf = '(i|we|they)' //we do not go
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
  // go quickly.
  { match: '^[#Infinitive] (#Adjective|#Adverb)$', group: 0, tag: 'Imperative', notIf: '(so|such|rather|enough)', reason: 'go-quickly' },
  // turn down the noise
  { match: '^[#Infinitive] (up|down|over) #Determiner', group: 0, tag: 'Imperative', reason: 'turn-down' },
  // eat my shorts
  { match: '^[#Infinitive] (your|my|the|some|a|an)', group: 0, notIf: 'like', tag: 'Imperative', reason: 'eat-my-shorts' },
  // tell him the story
  { match: '^[#Infinitive] (him|her|it|us|me)', group: 0, tag: 'Imperative', reason: 'tell-him' },
  // avoid loud noises
  { match: '^[#Infinitive] #Adjective #Noun$', group: 0, tag: 'Imperative', reason: 'avoid-loud-noises' },
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
  // would you recommend
  { match: '^#Modal you [#Infinitive]', group: 0, tag: 'Imperative', reason: 'would-you-' },
  // never say
  { match: '^never [#Infinitive]', group: 0, tag: 'Imperative', reason: 'never-stop' },
  // come have a drink
  { match: '^come #Infinitive', tag: 'Imperative', reason: 'come-have' },
  // come and have a drink
  { match: '^come and? #Infinitive', tag: 'Imperative . Imperative', reason: 'come-and-have' },
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
  // continue playing
  { match: '^[#Infinitive] #Gerund', group: 0, tag: 'Imperative', reason: 'keep-playing' },
  // go to it
  { match: '^[#Infinitive] (to|for|into|toward)', group: 0, tag: 'Imperative', reason: 'go-to' },
  // relax and unwind
  { match: '^[#Infinitive] (and|or) #Infinitive', group: 0, tag: 'Imperative', reason: 'inf-and-inf' },
]