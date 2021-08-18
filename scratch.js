/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

// ''
// ''
// ''

let m = nlp('the dog sat').insertBefore('and')
console.log(m.text())

// str = 'retail [stores]'
// let doc = nlp('one two three. three four five.').forEach(p => {
//   p.toUpperCase()
// })
// doc.debug()

// console.log(nlp.parseMatch(null))

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
