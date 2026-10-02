
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

nlp.verbose(true)
nlp(`look my change works`).debug()


// nlp.testSpec('He was tired, so we stopped. {Noun,Vb,Adj,Conj,Noun,Vb}').debug()
// let str = `Before the dog and the cat woke, she left. {Conj,Det,Noun,Conj,Det,Noun,Vb,Noun,Vb}`
// let doc=nlp.testSpec(str)
