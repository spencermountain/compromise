/* eslint-disable no-console, no-unused-vars */

import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')



// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s.text())


// let txt


// bug: doc-match issue
// let doc = nlp(`clearly did suggest`)
// let vb = doc.verbs()
// let parsed = vb.parse()[0]
// parsed.auxiliary.debug()
// vb.match(parsed.auxiliary).debug()



// let lex = {
//   big: 'Size',
//   'big apple': 'Town'
// }
// let _nlp = nlp.fork()
// nlp('the big apple', lex).debug()
// _nlp('the big apple').debug()



// insert punctuation issue
// let doc = nlp('one two. three four')
// doc.prepend('food')
// console.log(doc.text())



