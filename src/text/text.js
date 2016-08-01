'use strict';
const Sentence = require('./sentence')
// const Term = require('./term')
const TermList = require('./termList')
const SentenceList = require('./sentenceList')
const plurals = require('./tags').plurals

class Text {
  constructor(str) {
    this._sentences = str.split('  ').map((s) => new Sentence(s))

    //add tag filters for each pos
    Object.keys(plurals).forEach((k) => {
      this[k] = () => {
        return this.terms().if(plurals[k])
      }
    })

  }
  terms() {
    let terms = this._sentences.reduce((arr, s) => arr.concat(s.terms), [])
    return new TermList(terms)
  }
  sentences() {
    return new SentenceList(this._sentences)
  }
  verbs() {
    let terms = this.terms().if('Verb')
    return new TermList(terms)
  }
  nouns() {
    return this.terms().if('Noun')
  }
}
module.exports = Text
