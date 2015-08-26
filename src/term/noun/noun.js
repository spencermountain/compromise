'use strict'
var Term = require("../term.js")
var article = require("./article.js")


class Noun extends Term {
  constructor(str) {
    super(str)
  }
  //noun methods
  article() {
    return article(this.normal)
  }
}

let t = new Noun("house")
console.log(t.article())

module.exports = Noun
