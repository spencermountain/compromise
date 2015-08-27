'use strict'
var Term = require("../term.js")
var to_adjective = require("./to_adjective.js")

class Adverb extends Term {
  constructor(str) {
    super(str)
  }
  to_adjective() {
    return to_adjective(this.normal)
  }
}

// let t = new Adverb("quickly")
// console.log(t.to_adjective())

module.exports = Adverb
