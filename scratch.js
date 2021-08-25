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

// let doc = nlp(`one two three. four five six`)

// let m = doc.match('two three')
// let three = doc.match(m)
// console.log(m.pointer)
// console.log(three.pointer)
// console.log(m.match('three').pointer)

let doc = nlp('one match two three. four five match six')
let res = doc.not('match two').debug()
// res.debug()

// we are hiring
// we begin hiring

// let doc = nlp(`standards for teaching and learning – the first`).debug()
// let doc = nlp(`gotta get`).debug()
// console.log(doc.verbs().json()[0])

// bug:
// let doc = nlp(`zero one two three am here six seven`)
// let m = doc.match('am here')
// let end = m.not('am').debug()
// console.log(m.pointer)
// console.log(end.pointer)

// console.log(doc.all().text() + '|')
// // #864
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
