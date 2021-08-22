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

let doc = nlp(`one two three seven. four five six`)
// let a = doc.eq(0) //.clone()
// doc.tag('Person')
doc.if('four').debug()

// let doc = nlp(`one two three. four five six`)
// let a = doc.eq(0).clone()
// a.all().tag('Person')
// // a.debug()
// doc.debug()

// console.log(nlp.parseMatch(null))

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
