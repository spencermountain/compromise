/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/one/index.js'
// nlp.verbose(true)

let doc = nlp("yeah he's cool.")
// doc.contractions().expand()
// doc.debug()
// doc.compute('contractions').debug()
console.log(doc.json(0))
// console.dir(doc.json(), { depth: 5 })
// console.dir(nlp.methods(), { depth: 5 })
// let model = nlp.model()
// console.dir(model, { depth: 1 })
// let c = doc.chunks()
// console.log(c)
// c.debug()
// found.eq(0).text('normal')
/*
['', '#'],
['', '#'],
['', '#'],
*/

// doc.compute('root')
