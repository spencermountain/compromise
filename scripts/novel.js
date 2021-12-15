/* eslint-disable no-console, no-unused-vars */
import nlp from '../src/three.js'
import fs from 'fs'
import corpus from 'nlp-corpus'

/* regular novel
  7,000 sentences
  80,000 words
  525kb 
*/
// const txt = corpus.all().slice(0, 7000).join('\n')

/* Infinite Jest   - 6x novels
  36,247 sentences
  543,861 words
  3.4mb
*/
let txt = fs.readFileSync('/Users/spencer/data/infinite-jest/infinite-jest.txt').toString()

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
// console.log(doc.text().length)

let end = new Date()
console.log((end.getTime() - begin.getTime()) / 1000)