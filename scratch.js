/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'

// nlp.verbose('tagger')

// bug!
// let doc = nlp(`extra. one two.`)
// doc.remove('extra')
// console.log(doc.text())

// Purchase of power from IPPs will ruin GEB
// States that make basic private health insurance [should receive] federal funds
let doc = nlp(`Images of death have lost shock value`)
// let m = doc.match('(have|lost|shock value)')
// let res = m.map(s => s.fullSentence())
// res.debug()
doc.ptrs = [[0], [0]]
// doc.filter(m => {
//   console.log(m)
// })
// res = res.unique()
// console.log(doc)
console.log(doc.fullPointer)
// doc.filter(m => {
//   console.log(m)
// })
// doc.questions().debug()
// console.log(doc.quotations().text('normal'))
//
/*












*/
