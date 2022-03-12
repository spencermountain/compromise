/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''
txt = 'suddenly bolt heatedly'
let doc = nlp(txt).compute('root')
doc.debug()
console.log(doc.json()[0].terms)
// console.log(doc.text('root'))

console.log(doc.model.one.lexicon.heatedly)