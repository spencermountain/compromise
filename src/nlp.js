'use strict'
let Term = require("./term.js")
let fns = require("./fns.js")

class Nlp {
  constructor(str) {
    this.str = str;
    let words = this.str.split(" ")
    this.terms = words.map(function(s) {
      return new Term(s)
    })
  }
  text() {
    return fns.pluck(this.terms, 'text').join(" ")
  }
}

var n = new Nlp("Hii Dr. Nick!")
console.log(n.text())
