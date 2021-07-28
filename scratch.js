/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/three/index.js'
// nlp.verbose(true)

let doc = nlp('i walked so far. i talked so much.')
doc.compute('freq').debug()

// console.dir(nlp.methods(), { depth: 5 })
// let c = doc.chunks()
// console.log(c)
// c.debug()

/*
['', '#'],
['', '#'],
['', '#'],
*/

// doc.compute('root')
