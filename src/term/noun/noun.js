"use strict";
let Term = require("../term.js");
let article = require("./article.js");
let is_plural = require("./is_plural.js");
let singularize = require("./singularize.js");
let pluralize = require("./pluralize.js");
let is_uncountable = require("./is_uncountable.js");

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
