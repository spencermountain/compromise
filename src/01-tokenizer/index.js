const Term = require('../Term/Term')
const Phrase = require('../Phrase/Phrase')
const Pool = require('./Pool')

const splitSentences = require('./01-sentences')
const splitTerms = require('./02-words')

//add forward/backward 'linked-list' prev/next ids
const addLinks = terms => {
  terms.forEach((term, i) => {
    if (i > 0) {
      term.prev = terms[i - 1].id
    }
    if (terms[i + 1]) {
      term.next = terms[i + 1].id
    }
  })
}

/** turn a string into an array of Phrase objects */
const fromText = function(text = '', world, pool) {
  //a bit of validation, first
  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text)
    }
  }
  //tokenize into words
  let sentences = splitSentences(text, world)
  sentences = sentences.map(str => splitTerms(str))

  //turn them into proper objects
  pool = pool || new Pool()

  let phrases = sentences.map(terms => {
    terms = terms.map(str => {
      let term = new Term(str)
      pool.add(term)
      return term
    })
    //add next/previous ids
    addLinks(terms)

    //return phrase objects
    return new Phrase(terms[0].id, terms.length, pool)
  })
  //return them ready for a Document object
  return phrases
}

// parse the compressed format '3,2|2,4'
const parseTags = function(text, tagList) {
  return text.split('|').map(str => {
    let numList = str.split(',')
    numList = numList.map(n => parseInt(n, 10))
    // convert a list pf numbers into an array of tag names
    return numList.map(num => {
      if (!tagList[num]) {
        console.warn('Compromise import: missing tag at index ' + num)
      }
      return tagList[num]
    })
  })
}

/** create a word-pool and Phrase objects from .export() json*/
const fromJSON = function(json, world) {
  if (typeof json === 'string') {
    json = JSON.parse(json)
  }
  let pool = new Pool()
  //create Phrase objects
  let phrases = json.list.map(o => {
    // tokenize words from sentence text
    let terms = splitTerms(o[0])
    // unpack the tag data for each term
    let tagArr = parseTags(o[1], json.tags)
    //create Term objects
    terms = terms.map((str, i) => {
      let term = new Term(str)
      tagArr[i].forEach(tag => term.tag(tag, '', world))
      pool.add(term)
      return term
    })
    //add prev/next links
    addLinks(terms)
    // return a proper Phrase object
    return new Phrase(terms[0].id, terms.length, pool)
  })
  return phrases
}

module.exports = {
  fromText,
  fromJSON,
}
