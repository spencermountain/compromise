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

// console.log(nlp.model().two.tagSet)
let doc = nlp('one two three. spencer brown')
// let a = doc.clone()
// a.tag('Person')
doc.debug()

// console.log(nlp.parseMatch(null))

/*
1. efrt-unpack
2. suffix-thumb
3. grad-school
*/
