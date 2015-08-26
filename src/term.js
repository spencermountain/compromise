'use strict'

class Term {
  constructor(str) {
    this.text = str;
    this.normal = this.normalize();
  }
  normalize() {
    return this.text.toLowerCase();
  }
}

// var text = new Term("Hii Dr. Nick!")
// console.log(text)

module.exports = Term
