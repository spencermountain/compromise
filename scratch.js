/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/two/lib.js'
nlp.verbose(true)

// let doc = nlp("Jardas al Abid's", { 'Jardas al Abid': 'Foo' })
// let doc = nlp("one isn't two three").contractions().expand().debug()
let doc = nlp(`he's cool.`).debug()
// console.log(doc.docs[0])
// doc.compute('contractions')
// console.log(doc.out('tags'))
// console.log(doc.model)
// console.dir(doc.model, { depth: 1 })
// console.log(Object.keys(doc.model))
// console.log(doc.model)
// let m = doc.match('two')
// m.insertAfter('two yeah cool')
// m.debug()
// console.log(doc.json(0))
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
