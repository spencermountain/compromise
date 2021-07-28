/* eslint-disable no-console, no-unused-vars */
// import './tests/_ignore/_error.js'
import nlp from './src/three/index.js'
// nlp.verbose(true)

let doc = nlp('i walked so far. i talked so much.').terms().has('talked')
// doc.compute('freq').debug()
// console.log(doc.json())
// console.dir(doc.json(), { depth: 5 })
// console.dir(nlp.methods(), { depth: 5 })
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
