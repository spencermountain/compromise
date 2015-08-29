"use strict";
const Term = require("../term.js");
const article = require("./article.js");
const is_plural = require("./is_plural.js");
const singularize = require("./singularize.js");
const pluralize = require("./pluralize.js");
const is_uncountable = require("./is_uncountable.js");

class Noun extends Term {
  constructor(str) {
    super(str);
    this.parent = "noun";
  }
  //noun methods
  article() {
    return article(this.normal);
  }

  is_plural() {
    return is_plural(this.normal);
  }
  is_uncountable() {
    return is_uncountable(this.normal);
  }
  pluralize() {
    return pluralize(this.normal);
  }
  singularize() {
    return singularize(this.normal);
  }
}

// let t = new Noun("forks")
// console.log(t.singularize())

module.exports = Noun;
