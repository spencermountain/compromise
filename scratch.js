/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

nlp.verbose(true)

console.log('start')
let doc = nlp.tokenize(`hoo ya babay`)
doc.match('nword{2,4}').debug()
console.log('done')
// console.log(nlp.parseMatch('nword{2,4}'))
/*

['', '#'],
['', '#'],
['', '#'],
*/
