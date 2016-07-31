'use strict';

class Term {
  constructor(str) {
    this.text = str
    this.pos = {}
    if (str === 'is') {
      this.pos.Verb = true
    }
    if (str === 'this' || str === 'it') {
      this.pos.Noun = true
    }
    if (str === 'nice') {
      this.pos.Adjective = true
    }
  }

  is(str) {
    if (this.pos[str]) {
      return true
    }
    return false
  }

  to(fn) {}
}
module.exports = Term
