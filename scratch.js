/* eslint-disable no-console, no-unused-vars */
// import './tests/lib/_error.js'
import nlp from './src/index.js'
// import nlp from './src/one/index.js'

// nlp.verbose(true)

// let doc = nlp('the big dog played')
// doc.match('the [<target>#Adjective] [<type>#Noun] [<target>played]', 'target').debug()

// let doc = nlp(' martha stewart. tiger king. ')
// let m = doc.match('tiger king')
// let m = doc.eq(1)
let doc = nlp('spencer is really cool').not('#Adverb').debug()

console.log('|' + doc.text() + '|')
/*

['', '#'],
['', '#'],
['', '#'],
*/
