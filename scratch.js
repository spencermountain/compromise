/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
// nlp.verbose('tagger')

// let doc = nlp.tokenize(`I'm`).match('foo? am').debug()
// let doc = nlp.tokenize(`i'm`).match("i'm").debug()
// let doc = nlp.tokenize(`i'm`).match('i am').debug()

// let doc = nlp('write off')
// doc.debug()
// console.log(nlp.world().model.two.lexicon['write off'])

let doc = nlp(`Dundas st. Toronto`)
doc.abbreviations().stripPeriods()
console.log(doc.text())
// console.log(nlp.parseMatch('foobar'))
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
