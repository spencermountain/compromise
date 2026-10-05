// this is really hard to do
const notIf = '(i|we|they)' //we do not go
export default [
  // do not [go]
  { match: '^do not? [#Infinitive #Particle?]', notIf, group: 0, tag: 'Imperative', reason: 'do-eat' },
  // please [go]
  { match: '^please do? not? [#Infinitive #Particle?]', group: 0, tag: 'Imperative', reason: 'please-go' },
  // just [go]
  { match: '^just do? not? [#Infinitive #Particle?]', group: 0, tag: 'Imperative', reason: 'just-go' },
  // [go] quickly.
  { match: '^[#Infinitive] (#Adjective|#Adverb|hard|high|fast|slow)$', group: 0, tag: 'Imperative', notIf: '(so|such|rather|enough)', reason: 'go-quickly' },
  // [turn] down the noise
  { match: '^[#Infinitive] (up|down|over) #Determiner', group: 0, tag: 'Imperative', reason: 'turn-down' },
  // [eat] my shorts
  { match: '^[#Infinitive] (your|my|the|a|an|any|each|every|some|more|with|on)', group: 0, notIf: 'like', tag: 'Imperative', reason: 'eat-my-shorts' },
  // [tell] him the story
  { match: '^[#Infinitive] (him|her|it|us|me|there)', group: 0, tag: 'Imperative', reason: 'tell-him' },
  // [avoid] loud noises
  { match: '^[#Infinitive] #Adjective #Noun$', group: 0, tag: 'Imperative', reason: 'loud-noises' },
  // [come] and have a drink
  { match: '^[#Infinitive] (#Adjective|#Adverb)? and #Infinitive', group: 0, tag: 'Imperative', reason: 'and-reserve' },
  // [go]
  { match: '^[go] please?$', group: 0, tag: 'Imperative', reason: 'go-imp' },
  // [stop]
  { match: '^[stop] please?$', group: 0, tag: 'Imperative', reason: 'stop-imp' },
  // [wait]
  { match: '^[wait] please?$', group: 0, tag: 'Imperative', reason: 'wait-imp' },
  // [hurry]
  { match: '^[hurry] please?$', group: 0, tag: 'Imperative', reason: 'hurry-imp' },
  // let's [leave]
  { match: '^let (us|me) [#Infinitive]', group: 0, tag: 'Imperative', reason: 'lets-leave' },
  // [shut] the door
  { match: '^[(shut|close|open|start|stop|end|keep)] #Determiner #Noun', group: 0, tag: 'Imperative', reason: 'shut-the-door' },
  // [turn off] the light
  { match: '^[#PhrasalVerb #Particle] #Determiner #Noun', group: 0, tag: 'Imperative', reason: 'turn-off' },
  // [go] to toronto
  { match: '^[go] to .', group: 0, tag: 'Imperative', reason: 'go-to-toronto' },
  // A modal question alone may ask about ability or knowledge. Require an
  // explicit request marker before treating it as an imperative.
  // can you please [walk]
  { match: '^(can|could|will|would) you (#Adverb|not)+? please (#Adverb|not)+? [#Infinitive]', group: 0, tag: 'Imperative', reason: 'would-please' },
  // please can you [walk]
  { match: '^please (can|could|will|would) you (#Adverb|not)+? [#Infinitive]', group: 0, tag: 'Imperative', reason: 'please-you' },
  // can you [walk] please
  { match: '^(can|could|will|would) you (#Adverb|not)+? [#Infinitive] .+? please$', group: 0, tag: 'Imperative', reason: 'please-end' },
  // come have a drink
  { match: '^come #Infinitive', tag: 'Imperative', notIf: 'on', reason: 'come-have' },
  // come and have a drink
  { match: '^come and #Infinitive', tag: 'Imperative . Imperative', reason: 'come-and-have' },
  // [keep] it silent
  { match: '^[keep] it #Adjective', group: 0, tag: 'Imperative', reason: 'keep-it-cool' },
  // [allow] yourself
  { match: '^(and|but)? (then|please)? [#Infinitive] (yourself|yourselves)', group: 0, tag: 'Imperative', reason: 'allow-yourself' },
  // [look] what happened
  { match: '^[#Infinitive] what .', group: 0, tag: 'Imperative', reason: 'look-what' },
  // [go] to it
  { match: '^[#Infinitive] (to|for|into|toward|here|there)', group: 0, tag: 'Imperative', reason: 'go-to' },
  // [come] and have a drink
  { match: '^[#Infinitive] (and|or) #Infinitive', group: 0, tag: 'Imperative', reason: 'inf-and-inf' },
  // [maintain] eye contact
  { match: '^[#Infinitive] #Adjective? #Singular #Singular', group: 0, tag: 'Imperative', reason: 'eye-contact' },
  // don't forget to [clean]
  { match: '^do not (forget|omit|neglect) to [#Infinitive]', group: 0, tag: 'Imperative', reason: 'do-not-forget' },
  // [add] 2 eggs
  { match: '^[#Infinitive] #Value #Noun', group: 0, tag: 'Imperative', reason: 'add-2-eggs' },

]
