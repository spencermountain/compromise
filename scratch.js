/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'

// nlp.verbose(true)
let doc = nlp('Tony, is')
console.log(doc.text('reduced'))
/*
['', '#'],
['', '#'],
['', '#'],
*/
