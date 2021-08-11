/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/one.js'
// nlp.verbose('match')

// let doc = nlp.tokenize(`I'm`).match('foo? am').debug()
// let doc = nlp.tokenize(`i'm`).match("i'm").debug()
// let doc = nlp.tokenize(`i'm`).match('i am').debug()

let doc = nlp('one two three. four two five.')
// let m = doc.match('two').prepend('foo')
doc.debug()
// doc.debug()
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
