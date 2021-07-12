/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let str = '(hey cool) and cool'
let doc = nlp(str).toParentheses().dehyphenate()
// doc.terms().post('! ')
// console.log(doc.pre('"', true))
console.log(doc.text())
/*
['', '#'],
['', '#'],
['', '#'],
*/
