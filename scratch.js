/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/two/index.js'
// console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let doc = nlp('spencer is really cool').not('#Adverb')
console.log(doc.text())
// let doc = nlp('toronto and montreal. Sydney and Paris')
// let m = doc.match('#Place')
// console.log(m.text())
// doc.terms().post('! ')
// console.log(doc.pre('"', true))
// console.log(doc.text())
/*
['', '#'],
['', '#'],
['', '#'],
*/
