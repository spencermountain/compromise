/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

nlp.verbose(true)

let doc = nlp('hello John, Lisa, Fred').debug()
doc.match('#FirstName{3,6}').debug()

/*

['', '#'],
['', '#'],
['', '#'],
*/
