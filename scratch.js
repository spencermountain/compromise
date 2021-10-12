/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// let txt = `conditions of employment started`
// let txt = `one first step `
let txt = `He's probably still scared and unsure`

let doc = nlp(txt).debug()
// console.log(doc.text('normal'))
// console.log(doc.text())

// console.log(doc.verbs().json()[0])
//
/*












*/
