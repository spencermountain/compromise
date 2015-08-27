//part-of-speech tagging
'use strict'
let lexicon_pass = require("./lexicon_pass")
let contractions = require("./contractions")

let tagger = function(s) {
  s.terms = contractions(s.terms)
  s.terms = lexicon_pass(s.terms)

  return s.terms
}

module.exports = tagger
