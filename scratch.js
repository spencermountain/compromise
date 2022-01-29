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


let r = nlp(`he is cool.`)
r.contract()
console.log(r.text())
console.log(r.text('normal'))
console.log(r.text('implicit'))