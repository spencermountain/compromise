
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// determiner6 -> "some eat apples"
// your-guild-colors -> "your dog smiles"
// det-inf -> "the poor eat rice"
// a-nice-inf -> "the poor eat rice"
// had-time -> "she had put it there"
// western-line -> "the western coast"
// shut-the -> "near the lake we rested"
// some-kind -> "a kind teacher"
// so-noun -> "I do so well"
// studies-hard -> "the doors close"
// suffered-by -> "he walked by the house"
// ambg-honorifics -> "I miss John"
// dance-music -> "she can read music"
// had-been -> "we had been tired"
// - slowly-adj -> "he grew slowly impatient"
// - adj-to -> "she is free to leave"
// - left-verb -> "his left hand hurts"
// - he-read -> "can she read this?"
// - have-read -> "we have running water"
// - rude-and-x -> "she is happy and dancing"

// singular-subject-predicate
// would-you-please
// to-the-store
// noun-like
// be-late
// off-white-copula

nlp.verbose(true)
nlp(`the doors close`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
// let str = `Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}`
// let doc=nlp.testSpec(str)
