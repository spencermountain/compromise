const lexData = require('./_data')
const unpack = require('efrt-unpack')
const fancy = require('./fancy')
let misc = require('./misc')

// let a user explode their lexicon, too
const addWords = function (wordsObj, lex, world) {
  Object.keys(wordsObj).forEach(word => {
    let tag = wordsObj[word]
    // abbreviation-words are used in our tokenizer
    if (tag === 'Abbreviation' || tag === 'Unit') {
      world.cache.abbreviations[word] = true
    }
    // cache multi-words
    let multi = word.split(' ')
    if (multi.length > 1) {
      world.hasCompound[multi[0]] = true
    }

    // do some ad-hoc work before adding it
    if (fancy[tag] !== undefined) {
      fancy[tag](lex, word, world)
      return
    }
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
const buildOut = function (world) {
  //our bag of words
  let lexicon = Object.assign({}, misc)
  // start adding words to the lex
  Object.keys(lexData).forEach(tag => {
    let wordsObj = unpack(lexData[tag])
    // this part sucks
    Object.keys(wordsObj).forEach(w => {
      wordsObj[w] = tag
    })
    addWords(wordsObj, lexicon, world)
  })
  // console.log(Object.keys(lexicon).length)
  return lexicon
}

module.exports = {
  buildOut: buildOut,
  addWords: addWords,
}
