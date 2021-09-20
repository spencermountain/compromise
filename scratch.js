/* eslint-disable no-console, no-unused-vars */
import nlp from './src/three.js'

nlp.verbose('tagger')

/*

1. verb parse
2. verb conjugate
3. noun parse
  3a. person parse0
  3a. place parse


*/

// let doc = nlp('the people in toronto drove quickly').debug()
// let doc = nlp(`he professes love`).debug()
// let doc = nlp(` and living in Toronto`).debug()
// let doc = nlp(` Amazing Experience! `).debug()

// let text = 'litigation costs'
let text = 'US battles to save storm victims'
text = 'integrated tube'
text = 'suspected terrorists'
// text = 'extremely heated tube'
let doc = nlp(text).debug()
// doc.nouns().debug()
// doc.compute('chunks').debug('chunks')
// doc.verbs().subjects().debug()
// doc.verbs().debug()
// console.log(doc.verbs().conjugate())
// doc.verbs().forEach(vb => {
//   vb = vb.verbs()
//   console.log(vb.text())
//   vb.subjects().debug()
// })
// doc.verbs().toInfinitive()

/*




*/
