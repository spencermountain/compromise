/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import plg from './plugins/speech/src/plugin.js'
// nlp.plugin(plg)
// import nlp from './builds/three/compromise-three.cjs'
nlp.verbose('tagger')

let txt = ''

// jan 11
// txt = `SQL code by IBM.`
// txt = `auto mechanics that work for`
// txt = `Good place to be`
// txt = `energy and finance `
let doc = nlp(txt)
// let m = doc.match('(#ProperNoun && .)')
doc.debug()


