'use strict'
var Term = require("../term.js")
var article = require("./article.js")
var is_plural = require("./is_plural.js")
var singularize = require("./singularize.js")
var pluralize = require("./pluralize.js")
var is_uncountable = require("./is_uncountable.js")

class Noun extends Term {
  constructor(str) {
    super(str)
  }
  //noun methods
  article() {
    return article(this.normal)
  }

  is_plural() {
    return is_plural(this.normal)
  }
  is_uncountable() {
    return is_uncountable(this.normal)
  }
  pluralize() {
    return pluralize(this.normal)
  }
  singularize() {
    return singularize(this.normal)
  }
}

// let t = new Noun("forks")
// console.log(t.singularize())

module.exports = Noun
