/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

// ''
// ''
// ''

let str
// str = 'retail [stores]'
// str = 'i will be walking '
// let doc = nlp(str)
// let m = doc.match('be').insertAfter('really')
// doc.debug()

console.log('start')
let text = 'The quick brown fox jumped over the lazy dog.\n'
// text += 'Hi!\n'.repeat(100000)
text += '--\n'.repeat(100000)
let _doc = nlp.tokenize(text)
console.log('done')
// console.log(nlp.parseMatch('foo {Noun}'))

/*
['', '#'],
['', '#'],
['', '#'],
*/

/*

> One
.compute(normal)

> Two
Insert/replace

> Three
.compute([root,  numbers, dates])
methods.compute.root(terms)

* Use suffix-thumb runner for transformations
* Figure-out phrase tagging 


*/
