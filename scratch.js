/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
nlp.verbose('chunker')

// ''
// ''
// ''

// let str = `retail stores have it worse`
// let str = `chandler's medicine under the sink`
let str = `the most diverse country is the best`
// let str = `mountain ranges `
// let str = `left is always right`
// let str = `the place is small with indoor & outdoor seating and quite cute & quaint`

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
