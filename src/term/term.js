'use strict';

class Term {
  constructor(str) {
    this.text = str
    this.pos = {}
  }

  /** queries about this term with true or false answer */
  is(str) {
    if (this.pos[str]) {
      return true
    }
    return false
  }

  /** get a list of words to the left of this one, in reversed order */
  before(n) {
    let terms = this.context.sentence.terms
    //get terms before this
    let index = this.index()
    terms = terms.slice(0, index)
    //reverse them
    let reversed = []
    var len = terms.length;
    for (let i = (len - 1); i !== 0; i--) {
      reversed.push(terms[i]);
    }
    let end = terms.length
    if (n) {
      end = n
    }
    return reversed.slice(0, end)
  }

  /** get a list of words to the right of this one */
  next(n) {
    let terms = this.context.sentence.terms
    let i = this.index()
    let end = terms.length - 1
    if (n) {
      end = n
    }
    return terms.slice(i, end)
  }


  /** where in the sentence is it? zero-based. */
  index() {
    let terms = this.context.sentence.terms
    for (let i = 0; i < terms.length; i++) {
      if (terms[i] === t) {
        return i
      }
    }
    return null
  }

}
module.exports = Term
