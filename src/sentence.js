'use strict';
const Term = require('./term')

class Sentence {
  constructor(str) {
    this.terms = str.split(' ').map((s) => new Term(s))
    this.role = {}
    if (str.match(/\?/)) {
      this.role.Question = true
    } else {
      this.role.Statement = true
    }

  }
  is(str) {
    if (this.role[str]) {
      return true
    }
    return false
  }
  text() {
    return this.terms.reduce((str, t) => {
      str += ' ' + t.text
      return str
    }, '')
  }
}
module.exports = Sentence
