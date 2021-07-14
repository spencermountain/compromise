/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

// let str = 'before spencer and end. spencer middle end. start and spencer.'
// let doc = nlp(str)
// doc.splitAfter('spencer').debug()

let doc = nlp('toronto and montreal. Sydney and Paris')
let m = doc.match('#Place')
console.log(m.text())
// doc.terms().post('! ')
// console.log(doc.pre('"', true))
// console.log(doc.text())
/*
['', '#'],
['', '#'],
['', '#'],
*/
