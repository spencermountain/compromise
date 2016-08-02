'use strict';

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
  text() {
    return this.terms.map((t) => t.text)
  }
}

module.exports = TermList
