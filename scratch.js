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

let doc = nlp('queen elizabeth').debug()
// doc.compute('chunks').debug('chunks')
// doc.people().debug()
console.log(doc.people().json())

/*




*/
