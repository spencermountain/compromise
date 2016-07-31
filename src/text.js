'use strict';
const sentenceList = require('./sentenceList')

class Text {
  constructor(str) {
    this._sentences = str.split('. ')
    this.sentences = sentenceList(this._sentences, this)
    this.terms = this.sentences.terms
  }
}
module.exports = Text
