/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/dates/src/plugin.js'
// nlp.plugin(plg)

// nlp.verbose('tagger')

let txt = ''

// txt = `spencer's cool and Dr. Miller and his pal Joe`

let doc = nlp('Spencer is very cool.')
doc.match('spencer').replaceWith((m) => {
  return 'foo'
})
doc.debug()