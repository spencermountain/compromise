/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/three/index.js'
// nlp.verbose(true)

// let doc = nlp('he is really cool')
let doc = nlp('he is a really big guy')
let c = doc.chunks()
console.log(c)
c.debug()

/*
['', '#'],
['', '#'],
['', '#'],
*/
