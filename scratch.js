/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''

// txt = `spencer's cool and Dr. Miller and his pal Joe`

// let doc = nlp('the cat and the dog')
// doc.replace('#Noun', 'house')
// doc.debug()


let doc = nlp(`“Fun” and stuff`).debug()
// console.log(doc.json()[0].terms)
console.log(doc.text('normal'))