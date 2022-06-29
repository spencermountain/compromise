/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
// let doc = nlp('33gbps').debug()
// doc = nlp('33 gbps').debug()

let lex = {
  'queen anne\'s lace': 'Flower'
}
let doc = nlp(`Queen Anne's lace`, lex)
doc.match(`#Flower`).debug()
console.log(doc.docs[0])