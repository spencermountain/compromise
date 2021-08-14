/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

let doc = nlp('after all the partying was over, he kissed his bride on the lips')
doc.sentences().debug()

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
