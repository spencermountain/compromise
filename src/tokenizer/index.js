const Term = require('../03-term/Term')
const Phrase = require('../02-phrase/Phrase')
const Pool = require('./Pool')

const splitSentences = require('./01-sentences')
const splitTerms = require('./02-words')

/** turn a string into an array of Phrase objects */
const fromText = function(text = '', pool) {
  //tokenize into words
  let sentences = splitSentences(text)
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
    terms.forEach((term, i) => {
      if (i > 0) {
        term.prev = terms[i - 1].id
      }
      if (terms[i + 1]) {
        term.next = terms[i + 1].id
      }
    })

    //return phrase objects
    return new Phrase(terms[0].id, terms.length, pool)
  })
  //return them ready for a Document object
  return phrases
}

/** create a word-pool and Phrase objects from .json() results*/
const fromJSON = function(data) {
  let pool = new Pool()
  //create Phrase objects
  let phrases = data.map(terms => {
    //create Term objects
    terms = terms.map(obj => {
      let term = new Term(obj.text)
      pool.add(term)
      return term
    })
    return new Phrase(terms[0].id, terms.length, pool)
  })
  console.log(pool)
  return phrases
}

module.exports = {
  fromText,
  fromJSON,
}
