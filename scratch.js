
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// kinda-sparkly-and -> "she ran very quickly and quietly"
// studies-hard -> "the doors close"
// suffered-by -> "he walked by the house"
// ambg-honorifics -> "I miss John"
// dance-music -> "she can read music"
// had-been -> "we had been tired"

// singular-subject-predicate
// would-you-please
// to-the-store
// noun-like
// be-late
// off-white-copula

nlp.verbose(true)
nlp(`her first child`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
// let str = `Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}`
// let doc=nlp.testSpec(str)
