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

const str = 'John xoo, John fredman, John davis'
let r = nlp(str)
r = r.split('@hasComma')
// r = r.sort('alpha')
r = r.sort('seq')
r.debug()