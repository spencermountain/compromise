const Term = require('../Term/Term')
const Phrase = require('../Phrase/Phrase')
const Pool = require('./Pool')
const linkTerms = require('./_linkTerms')
const splitSentences = require('./01-sentences')
const splitTerms = require('./02-words')

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/** turn a string into an array of Phrase objects */
const fromText = function (text = '', world, pool) {
  let sentences = null
  //a bit of validation, first
  if (typeof text !== 'string') {
    if (typeof text === 'number') {
      text = String(text)
    } else if (isArray(text)) {
      sentences = text
    }
  }
  //tokenize into words
  sentences = sentences || splitSentences(text, world)
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
    linkTerms(terms)

    //return phrase objects
    let p = new Phrase(terms[0].id, terms.length, pool)
    p.cache.terms = terms
    return p
  })
  //return them ready for a Document object
  return phrases
}

module.exports = fromText
