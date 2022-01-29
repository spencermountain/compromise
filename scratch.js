/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''

// txt = `spencer's cool and Dr. Miller and his pal Joe`

let doc = nlp('i am george and i live in Paris.')
doc = doc.replace('i am [#Person+] and i live in [.]', '$0 is from $1')
doc.debug()