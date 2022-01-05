/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
nlp.verbose('tagger')

let doc = nlp('toronto and montreal. Sydney and Paris.')
let m = doc.match('(#ProperNoun && .)')
doc.debug()
