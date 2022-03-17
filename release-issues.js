/* eslint-disable no-console, no-unused-vars */

import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')

// bug!
// let doc = nlp(`john walks`)
// let s = doc.sentences()
// s.toFutureTense().fullSentences()
// console.log(s.text())



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



// let doc = nlp('once told me')
// let m = doc.match('once')
// doc.insertBefore('somebody')
// m.debug()
// 'once'

// fork bungs-up regex
// let doc = nlp(`one match two.`)
// doc.fork()
// doc.compute('preTagger')
// doc.debug()


// split issue
// txt = 'a x b x c'
// let doc = nlp(txt)
// doc.splitBefore('x').debug()


// let m = nlp('one two three. foo.')
// m = m.splitOn('two')
// m.match('three').remove()
// m.debug()

