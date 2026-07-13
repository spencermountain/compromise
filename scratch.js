
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// import plg from './plugins/_experiments/cmd-k/src/plugin.js'
// nlp.plugin(plg)
// nlp.verbose(true)


// already tested for
// let doc = nlp(`Hikers and cyclists will soon find it easier to get around the Don Valley in Toronto without hitting a dead end.
// On July 13, the City of Toronto will {open} a new 1.5 km multi-use trail that will connect the Don Valley Trail to the Humber River and the Don River.`)
// console.log(doc.out('spec'))

let spec = `Hikers {and} cyclists hunted. {Noun|Plural,Conj,Noun,Past}`
nlp.testSpec(spec)//.debug()
