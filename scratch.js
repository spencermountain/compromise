/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
nlp.verbose('tagger')

// ''
// ''
// ''

let str = `no, it's only a body`
str = `You do realise it is`
str = `The amusing world of cartoons`
str = `He had this Habit of telling you`
str = `There's holes everywhere`
str = `john lkjsdf's house`
str = `20 guns means`
str = `that should work`
// str = `Then she was gone...`

// let str = `retail stores have it worse`
// let str = `chandler's medicine under the sink`
// let str = `mountain ranges `
// let str = `left is always right`
// let str = `the place is small with indoor & outdoor seating and quite cute & quaint`

let doc = nlp(str)
doc.debug({ chunks: false })

// doc.match('#{Verb}').debug()

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
