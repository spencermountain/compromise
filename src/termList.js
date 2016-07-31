'use strict';

const plurals = require('./tags').plurals

class TermList {
  constructor(terms) {
    this.terms = terms
    //add tag filters for each pos
    Object.keys(plurals).forEach((k) => {
      this[k] = () => {
        return this.if(plurals[k])
      }
    })
  }
  if(str) {
    this.terms = this.terms.filter((t) => t.is(str))
    return this
  }
  filter(fn) {
    this.terms = this.terms.filter(fn)
    return this
  }
  unique() {
    return this
  }
  first() {
    return this.terms[0]
  }
  text() {
    return this.terms.map((t) => t.text)
  }
  print() {
    console.log(this.text())
  }
}

module.exports = TermList
