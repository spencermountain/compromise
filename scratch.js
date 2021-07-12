/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'

// nlp.verbose(true)

let doc = nlp('i am good')
console.log(doc.document)
// console.log('contract')
// doc.contract()
// console.log(doc.out('array'))

// console.log('expand')
// doc.contractions().expand()
// console.log(doc.out('array'))

// console.log('contract')
// console.log(doc.document)
// doc.contract()
// console.log(doc.out('array'))

/*
['', '#'],
['', '#'],
['', '#'],
*/
