/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/two/index.js'
// console.log(nlp.model().lexicon[''])

// nlp.verbose(true)

let doc = nlp("now matt doesn't but yes for matthew")
let m = doc.match('(^matt)').debug()
console.log(nlp.parseMatch('(^matt)'))
// console.log(nlp.parseMatch('^matt'))
/*
['', '#'],
['', '#'],
['', '#'],
*/
