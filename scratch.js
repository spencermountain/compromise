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
let doc = nlp(`oh yeah he has really walked for sure`)
// let json = doc.verbs().json({ terms: false })[0]
// console.log(json)

let vb = doc.match('has really walked')
let main = vb.match('walked')
vb.debug()
const aux = vb.not('walked')
aux.debug()

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
