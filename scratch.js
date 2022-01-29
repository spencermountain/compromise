/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''

// txt = `spencer's cool and Dr. Miller and his pal Joe`

const doc = nlp('walk the plank')
doc.replace('walk the [.]', 'eat the $0')
doc.debug()
console.log(doc.text())