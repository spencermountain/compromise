/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())
let doc = nlp(`he did not see`).debug()
// doc.contractions().expand()
// console.log(doc.text())

console.log(doc.verbs().json()[0])
//
/*












*/
