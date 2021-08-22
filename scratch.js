/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

// ''
// ''
// ''
// bug:
// let m = nlp(`one two three`).match('.')
// m = m.splitAfter('two')
// m.debug()

let doc = nlp('if so, he is the best, that i see. he is the greatest')
let m = doc.match('he is the .')
let found = doc.matchOne(m).debug()

// console.log(nlp.parseMatch(null))

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
