const lexData = require('./_data')
const unpack = require('efrt-unpack')
let misc = require('./data/misc')

const fancy = {
  Unit: (lex, w) => {
    lex[w] = ['Abbreviation', 'Unit']
  },
  Cardinal: (lex, w) => {
    lex[w] = ['TextValue', 'Cardinal']
  },
  TextOrdinal: (lex, w) => {
    lex[w] = ['Ordinal', 'TextValue']
    lex[w + 's'] = ['TextValue', 'Fraction'] // add 'millionths'
  },
  // add plural/singular forms
  Singular: (lex, w, world) => {
    lex[w] = 'Singular'
    let plural = world.transforms.toPlural(w, world)
    lex[plural] = lex[plural] || 'Plural'
  },
  // conjugate these verbs
  Infinitive: (lex, w, world) => {
    lex[w] = 'Infinitive'
    let conj = world.transforms.conjugate(w, world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]]
      lex[str] = lex[str] || tags[i] // only if it's safe
    }
  },
  // conjugate other Adjectival forms
  Comparable: (lex, w, world) => {
    lex[w] = 'Comparable'
    let conj = world.transforms.adjectives(w)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let word = conj[tags[i]]
      lex[word] = lex[word] || tags[i] // only if it's safe
    }
  },
  //conjugate phrasal-verbs
  PhrasalVerb: (lex, w, world) => {
    // whole thing
    lex[w] = ['PhrasalVerb', 'Infinitive']
    //add original form
    let words = w.split(' ')
    // lex[words[0]] = lex[words[0]] || 'Infinitive'
    // //conjugate first word
    let conj = world.transforms.conjugate(words[0], world)
    let tags = Object.keys(conj)
    for (let i = 0; i < tags.length; i++) {
      let str = conj[tags[i]] + ' ' + words[1]
      lex[str] = lex[str] || ['PhrasalVerb', tags[i]]
      world.hasCompound[conj[tags[i]]] = true
    }
  },
  // inflect our demonyms - 'germans'
  Demonym: (lex, w, world) => {
    lex[w] = 'Demonym'
    let plural = world.transforms.toPlural(w, world)
    lex[plural] = lex[plural] || ['Demonym', 'Plural'] // only if it's safe
  },
}

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
