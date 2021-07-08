/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

nlp.verbose(true)

let doc = nlp(`spencer's city/town & cabin`) //.debug()
// console.dir(doc, { depth: 5 })
doc.match('spencer city and').debug()
/*

['', '#'],
['', '#'],
['', '#'],
*/
