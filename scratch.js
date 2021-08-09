/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/two/lib.js'
// nlp.verbose(true)

let doc = nlp(`hit Jardas al Abid's`, { 'Jardas al Abid': 'Cool' }).debug()

// console.log(doc.model._multiCache)
console.log(Object.keys(doc.model))

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
