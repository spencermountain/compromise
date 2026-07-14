
import nlp from './src/three.js'
import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
nlp.plugin(plg)
// nlp.verbose(true)

let arr = [
  // 'to' before a noun-phrase is a preposition - tagged Conjunction
  'she walked to the store. {Noun,Vb,Prep,Det,Noun}',
  // bare sentence-initial imperative is not tagged Imperative ('please close' is)
  'go home! {Vb|Imp,Noun}',
  // will+verb never receives the FutureTense tag
  'she will walk home. {Noun,Vb|Fut,Vb,Noun}',
  // locative 'there' is an adverb - tagged Noun|Uncountable
  'i walked there. {Noun,Vb,Adv}',
  // subject-aux inversion: 'did' is an auxiliary here - tagged plain PastTense
  'where did she go? {QuestionWord,Vb|Aux,Noun,Vb}',
  // a standalone demonstrative is a pronoun - tagged Determiner
  'who is that? {QuestionWord,Vb,Noun|Pronoun}',
  // a gerund subject loses its Gerund tag - tagged plain Noun|Singular
  'running is fun. {Noun|Ger,Vb,Adj}',
  // 'unless' gets the Condition tag, but 'if' stays a plain Conjunction
  'if it rains, we will stay home. {Condition,Noun,Vb,Noun,Vb,Vb,Noun}',
  // garden-path: 'man' is the verb - tagged Noun
  'the old man the boat. {Det,Adj,Vb,Det,Noun}',
  // garden-path: 'time' is the subject, 'flies' the verb - reversed
  'time flies like an arrow. {Noun,Vb,Prep,Det,Noun}',
  // garden-path: 'houses' is the verb - tagged Noun|Plural
  'the complex houses married and single soldiers. {Det,Adj,Vb,Adj,Conj,Adj,Noun}'
]
// let doc = nlp.fromSpec(arr[0]).debug()

let doc = nlp('john smith and Doug Johnson live in new york and cook at the restaurant')
doc.debug()
// doc.redact().debug()
// nlp('john smith and Sally Morris lives in new york').redact().debug()

