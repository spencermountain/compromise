'use strict';
// const TermList = require('./termList')

class SentenceList {
  constructor(sentences) {
    this.sentences = sentences
  }
  if(str) {
    this.sentences = this.sentences.filter((s) => s.is(str))
    return this
  }
  filter(fn) {
    this.sentences = this.sentences.filter(fn)
    return this
  }
  unique() {
    return this
  }
  reverse() {
    return this
  }
  first() {
    return this.sentences[0]
  }
  text() {
    return this.sentences.reduce((str, s) => {
      str += s.text() + ' '
      return str
    }, '')
  }
  print() {
    console.log(this.text())
  }
}

module.exports = SentenceList
