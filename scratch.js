/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three.js'
nlp.verbose('tagger')

// ''
// ''
// ''

let str = `john lkjsdf's house`
str = `There's holes everywhere`
str = `no, it's only a body`
// str = `You do realise it is`
// str = `He had this habit of telling you`
// str = `20 guns means`
// str = `that should smoke`
// str = `The amusing world of cartoons`
// str = `Then she was gone...`

let more = [
  // no!
  { match: '^no', tag: 'Expression', reason: 'no' },
  // {match:'',tag:'', reason:''},
]
let matches = nlp.world().model.two.matches
more.forEach(obj => matches.push(obj))

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
