/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

// let str = 'before spencer and end. spencer middle end. start and spencer.'
// let doc = nlp(str)
// doc.splitAfter('spencer').debug()

let doc = nlp('nothing found here. none here either')
let m = doc.splitOn('match')
console.log(m.eq(0).text())
// doc.terms().post('! ')
// console.log(doc.pre('"', true))
// console.log(doc.text())
/*
['', '#'],
['', '#'],
['', '#'],
*/
