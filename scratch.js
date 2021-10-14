/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// Purchase of power from IPPs will ruin GEB
let doc = nlp(`“Fun” and stuff`)
doc.quotations().debug()
console.log(doc.quotations().text('normal'))
//
/*












*/
