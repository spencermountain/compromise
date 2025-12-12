/* eslint-disable no-console, no-unused-vars */
// import corpus from 'nlp-corpus'
import nlp from '../../src/three.js'
import plugin from './src/plugin.js'
nlp.extend(plugin)

// let txt = 'toronto raptors play a toronto maple leafs'
// let doc = nlp(txt)
// console.log(doc.ngrams())

const doc = nlp('one two three. one two foo.')
const res = doc.ngrams({ min: 3 })
/*[
  { size: 3, count: 1, normal: 'one two three' },
  { size: 3, count: 1, normal: 'one two foo' }
]
*/
console.log(res)
// let txt = 'no, my son is also named Bort'

// let doc = nlp(txt)
// // console.log(doc.tfidf())
// doc.compute('tfidf')
// console.log(JSON.stringify(doc.json()[0].terms[6]))