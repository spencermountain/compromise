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

// let doc = nlp('one two. three four')
// doc.append('oooo')
// console.log(doc.text())

// #864
// let doc = nlp('"Good bye," he said.')
// doc.sentences().forEach(match => {
//   match.append('and left')
// })

// union/intersection/difference
// let doc = nlp('he is the best, that i see. he is the greatest')
// let childA = doc.if('greatest')
// let childB = doc.match('he is')
// let found = childA.match(childB).debug()

// console.log(nlp.parseMatch(null))

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
