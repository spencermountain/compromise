// this is really hard to do
const notIf = '(i|we|they)' //we do not go
export default [
  // visit https://example.com
  { match: '^[%Noun|Verb%] #Url', hook: '#Url', group: 0, tag: 'Imperative', reason: 'visit-url' },
  // do not go
  { match: '^do not? [#Infinitive #Particle?]', hook: 'do', notIf, group: 0, tag: 'Imperative', reason: 'do-eat' },
  // please go
  { match: '^please do? not? [#Infinitive #Particle?]', hook: 'please', group: 0, tag: 'Imperative', reason: 'please-go' },
  // just go
  { match: '^just do? not? [#Infinitive #Particle?]', hook: 'just', group: 0, tag: 'Imperative', reason: 'just-go' },
  // go quickly.
  { match: '^[#Infinitive] (#Adjective|#Adverb|hard|high|fast|slow)$', hook: '#Infinitive', group: 0, tag: 'Imperative', notIf: '(so|such|rather|enough)', reason: 'go-quickly' },
  // turn down the noise
  { match: '^[#Infinitive] (up|down|over) #Determiner', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'turn-down' },
  // eat my shorts
  { match: '^[#Infinitive] (your|my|the|a|an|any|each|every|some|more|with|on)', hook: '#Infinitive', group: 0, notIf: 'like', tag: 'Imperative', reason: 'eat-my-shorts' },
  // tell him the story
  { match: '^[#Infinitive] (him|her|it|us|me|there)', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'tell-him' },
  // avoid loud noises
  { match: '^[#Infinitive] #Adjective #Noun$', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'avoid-loud-noises' },
  // come and have a drink
  { match: '^[#Infinitive] (#Adjective|#Adverb)? and #Infinitive', hook: 'and', group: 0, tag: 'Imperative', reason: 'call-and-reserve' },
  // go
  { match: '^[go] please?$', hook: 'go', group: 0, tag: 'Imperative', reason: 'go' },
  // stop
  { match: '^[stop] please?$', hook: 'stop', group: 0, tag: 'Imperative', reason: 'go' },
  // wait
  { match: '^[wait] please?$', hook: 'wait', group: 0, tag: 'Imperative', reason: 'go' },
  // hurry
  { match: '^[hurry] please?$', hook: 'hurry', group: 0, tag: 'Imperative', reason: 'go' },
  // somebody call
  { match: '^(somebody|everybody) [#Infinitive]', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'somebody-call' },
  // let's leave
  { match: '^let (us|me) [#Infinitive]', hook: 'let', group: 0, tag: 'Imperative', reason: 'lets-leave' },
  // shut the door
  { match: '^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun', hook: '#Determiner', group: 0, tag: 'Imperative', reason: 'shut-the-door' },
  // turn off the light
  { match: '^[#PhrasalVerb #Particle] #Determiner #Noun', hook: '#Particle', group: 0, tag: 'Imperative', reason: 'turn-off-the-light' },
  // go to toronto
  { match: '^[go] to .', hook: 'go', group: 0, tag: 'Imperative', reason: 'go-to-toronto' },
  // go home
  { match: '^[(go|come)] home', hook: 'home', group: 0, tag: 'Imperative', reason: 'go-home' },
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please walk
  { match: '^(can|could|will|would) you (#Adverb|not)+? please (#Adverb|not)+? [#Infinitive]', hook: 'please', group: 0, tag: 'Imperative', reason: 'would-you-please' },
  // please can you walk
  { match: '^please (can|could|will|would) you (#Adverb|not)+? [#Infinitive]', hook: 'please', group: 0, tag: 'Imperative', reason: 'please-would-you' },
  // can you walk please
  { match: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] .+? please$', hook: 'please', group: 0, tag: 'Imperative', reason: 'would-you-please-end' },
  // never say
  { match: '^never [#Infinitive]', hook: 'never', group: 0, tag: 'Imperative', reason: 'never-stop' },
  // come have a drink
  { match: '^come #Infinitive', hook: 'come', tag: 'Imperative', notIf: 'on', reason: 'come-have' },
  // come and have a drink
  { match: '^come and #Infinitive', hook: 'come', tag: 'Imperative . Imperative', reason: 'come-and-have' },
  // stay away
  { match: '^[stay] (out|away|back)', hook: 'stay', group: 0, tag: 'Imperative', reason: 'stay-away' },
  // stay cool
  { match: '^[(stay|be|keep)] #Adjective', hook: '#Adjective', group: 0, tag: 'Imperative', reason: 'stay-cool' },
  // keep it silent
  { match: '^[keep] it #Adjective', hook: 'keep', group: 0, tag: 'Imperative', reason: 'keep-it-cool' },
  // allow yourself
  { match: '[#Infinitive] (yourself|yourselves)', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'allow-yourself' },
  // look what happened
  { match: '[#Infinitive] what .', hook: 'what', group: 0, tag: 'Imperative', reason: 'look-what' },
  // continue playing
  { match: '^[#Infinitive] #Gerund', hook: '#Gerund', group: 0, tag: 'Imperative', reason: 'keep-playing' },
  // go to it
  { match: '^[#Infinitive] (to|for|into|toward|here|there)', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'go-to' },
  // come and have a drink
  { match: '^[#Infinitive] (and|or) #Infinitive', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'inf-and-inf' },
  // commit to
  { match: '^[%Noun|Verb%] to', hook: 'to', group: 0, tag: 'Imperative', reason: 'commit-to' },
  // maintain eye contact
  { match: '^[#Infinitive] #Adjective? #Singular #Singular', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'maintain-eye-contact' },
  // don't forget to clean
  { match: 'do not (forget|omit|neglect) to [#Infinitive]', hook: 'not', group: 0, tag: 'Imperative', reason: 'do-not-forget' },
  // pay attention
  { match: '^[(ask|wear|pay|look|help|show|watch|act|fix|kill|stop|start|turn|try|win)] #Noun', hook: '#Noun', group: 0, tag: 'Imperative', reason: 'pay-attention' },
  // add 2 eggs
  { match: '^[#Infinitive] #Value #Noun', hook: '#Infinitive', group: 0, tag: 'Imperative', reason: 'add-2-eggs' },

]
