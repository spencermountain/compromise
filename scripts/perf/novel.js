/* eslint-disable no-console, no-unused-vars */
import nlp from '../../src/one.js'
import fs from 'fs'
import corpus from 'nlp-corpus'


const txt = corpus.all().slice(0, 7000).join('\n')
// let txt = fs.readFileSync('/Users/spencer/data/infinite-jest/infinite-jest.txt').toString()

//get filesize
const bytes = Buffer.byteLength(txt)
const size = Math.ceil(bytes / 1024)
console.log(` ${size}kb`)

let words = txt.split(' ')
console.log(words.length.toLocaleString(), 'words')


let begin = new Date()
let doc = nlp(txt)
let arr = doc.json()
console.log(arr.length)

let end = new Date()
console.log((end.getTime() - begin.getTime()) / 1000, 'seconds')


// dupe ids:
// let all = {}
// let dupes = 0
// arr.forEach(o => {
//   o.terms.forEach(term => {
//     if (term.id && all[term.id] === true) {
//       console.log('dupe', term.id)
//       dupes += 1
//     }
//     all[term.id] = true
//   })
// })
// console.log('dupes:', dupes)


/*(node 16)

* *regular novel*
  7,000 sentences
  80,000 words
  525kb 

  * one:  0.6 seconds
  * two: 2.4s
  * three: 3s
	
* *Infinite Jest:*   - 6x novels
  *36,247 sentences*
  *543,861 words*
    15 word sentences
    3.4mb

  * one:  2.6 seconds
  * two: 14s
  * three: 20s
*/
