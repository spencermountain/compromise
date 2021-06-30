import lexData from './_data.js'
import { unpack } from 'efrt'
import misc from './misc.js'
// let a user explode their lexicon, too
const addWords = function (wordsObj, lex) {
  Object.keys(wordsObj).forEach(word => {
    let tag = wordsObj[word]
    // abbreviation-words are used in our tokenizer
    // if (tag === 'Abbreviation' || tag === 'Unit') {
    //   world.cache.abbreviations[word] = true
    // }
    // // cache multi-words
    // let multi = word.split(' ')
    // if (multi.length > 1) {
    //   world.hasCompound[multi[0]] = true
    // }
    // do some ad-hoc work before adding it
    // if (expand[tag] !== undefined) {
    // expand[tag](lex, word)
    //   return
    // }
    //set it in our lexicon, basic
    if (lex[word] === undefined) {
      lex[word] = tag
      return
    }
    // if we already have that word
    if (typeof lex[word] === 'string') {
      lex[word] = [lex[word]]
    }
    if (typeof tag === 'string') {
      lex[word].push(tag)
    } else {
      lex[word] = lex[word].concat(tag)
    }
  })
}
// we do some ad-hoc stuff here, building-up our word-list
// const buildOut = function () {
//our bag of words
let lexicon = Object.assign({}, misc)
// start adding words to the lex
Object.keys(lexData).forEach(tag => {
  let wordsObj = unpack(lexData[tag])
  //   // this part sucks
  Object.keys(wordsObj).forEach(w => {
    wordsObj[w] = tag
  })
  addWords(wordsObj, lexicon)
})
export default lexicon
