/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
nlp.verbose('chunker')

// let str = `it has been estimated that the number of people aged 100 or over will rise steeply to reach over 626000 by 2080`
let str = `the place is small with indoor & outdoor seating and quite cute & quaint`

let doc = nlp(str)
doc.debug({ terms: false })

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
