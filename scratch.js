/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
nlp.verbose('tagger')

let doc = nlp(`Photographs from a computer are`)
doc.debug()


