// import nlp from 'compromise'
import nlp from '../../../src/one.js'
import { unpack } from 'efrt'

import model from '../en-articles.js'

let list = Object.keys(unpack(model))
// let list = [
//   "Brian Vollmer",
//   "Brian Wansink",
//   "Brice Marden",
//   "Brideless Groom",
// "Bridge Constructor Portal",
//   "Bridge Protocol Data Unit",
//   "Bridget Kearney",
//   "Bridget Malcolm",
//   "Bridgewater State University",
//   "Bridie",
// ]
// const miss = new Set('portal')
const miss = /constructor/
list = list.filter(str => miss.test(str) === false)
console.log(list.length.toLocaleString())

let trie = nlp.compile(list)

export default trie
