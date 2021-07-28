/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/two/lib.js'
// nlp.verbose(true)

let doc = nlp(`Tony, is`)
doc.contract()
// let doc = nlp("he's nice")
// doc.contractions().expand()
// doc.compute('contractions').debug()
doc.debug()
// console.log(doc.json(0))
// console.dir(doc.json(), { depth: 5 })
// console.dir(nlp.methods(), { depth: 5 })
// console.dir(nlp.model(), { depth: 1 })
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
