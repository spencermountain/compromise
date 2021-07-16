/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/two/index.js'
// console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let doc = nlp('super-cool work')
console.log(doc.text('normal'))
/*
['', '#'],
['', '#'],
['', '#'],
*/
