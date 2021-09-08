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

// let doc = nlp('Toronto, Chicago, USA')
let doc = nlp('one two three match four five')
let m = doc.match('match')
let res = m.concat(m.after())
res.debug()

// doc.compute('chunks').debug('chunks')
// doc.places().debug()

/*




*/
