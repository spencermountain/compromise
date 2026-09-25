
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// - tell-him -> "kiss him"
// - should-smoke -> "the can Bob sent"
// - would-mark -> "the can Bob sent"
// - being-adjective -> "she is being cool to me"


nlp.verbose(true)
nlp(`she is being cool to me`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
// let str = `Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}`
// let doc=nlp.testSpec(str)
