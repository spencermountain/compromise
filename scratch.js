/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

// nlp.verbose(true)

// let doc = nlp('the big dog played')
// doc.match('the [<target>#Adjective] [<type>#Noun] [<target>played]', 'target').debug()

let doc = nlp('doug is good')
let m = doc.match('.').match('.').debug()
// console.log(m.match('.'))

/*

['', '#'],
['', '#'],
['', '#'],
*/
