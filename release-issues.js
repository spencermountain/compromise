/* eslint-disable no-console, no-unused-vars */

import nlp from './src/three.js'
// import nlp from './builds/compromise.cjs'
// nlp.verbose('tagger')


// let lex = {
//   big: 'Size',
//   'big apple': 'Town'
// }
// let _nlp = nlp.fork()
// nlp('the big apple', lex).debug()
// _nlp('the big apple').debug()


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

