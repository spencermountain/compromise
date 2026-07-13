
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)
// nlp.verbose(true)


// already tested for
let doc = nlp(`Hikers and cyclists will soon find it easier to get around the Don Valley in Toronto without hitting a dead end.
On July 13, the City of Toronto will {open} a new 1.5 km multi-use trail that will connect the Don Valley Trail to the Humber River and the Don River.`)
console.log(doc.out('spec'))

let spec = `Hikers and cyclists will soon find it easier to get around the Don Valley in Toronto without hitting a dead end. {Noun,Conj,Noun,Vb,Vb,Vb,Noun,Adj,Conj,Vb,Vb,Det,Noun,Noun,Prep,Noun,Prep,Vb,Det,Adj,Noun}
On July 13, the City of Toronto will open a new 1.5 km multi-use trail that will connect the Don Valley Trail to the Humber River and the Don River. {Prep,Date,Val,Det,Noun,Noun,Noun,Vb,Vb,Det,Adj,Val,Noun,Noun,Noun,Det,Vb,Vb,Det,Noun,Noun,Noun,Conj,Det,Noun,Noun,Conj,Det,Noun,Noun}`
nlp.fromSpec(spec).debug()