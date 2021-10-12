/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

let txt = `The TTC's Bloor-Danforth Line`
// let txt = `one first step `

let doc = nlp(txt).debug()
console.log(doc.match('. . . .').json())
// console.log(doc.text('normal'))
// console.log(doc.text())

console.log(doc.verbs().json())
//
/*












*/
