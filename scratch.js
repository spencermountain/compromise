/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'

// nlp.verbose('tagger')

/*

1. verb parse
2. verb conjugate
3. noun parse
  3a. person parse
  3a. place parse


*/

// let doc = nlp('i gave him two fourths of a slice')
let doc = nlp('seven out of ten apples')
// let m = doc.match('fourths')
// m.replaceWith('fooo')
// m.debug()
// doc.compute('chunks').debug('chunks')
console.log(doc.fractions().json())
// console.log(doc.text())

/*




*/
