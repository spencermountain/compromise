//part-of-speech tagging
'use strict'
let Verb = require("../term/verb/verb.js")
let Noun = require("../term/noun/noun.js")
let Value = require("../term/value/value.js")
let Adverb = require("../term/adverb/adverb.js")
let Adjective = require("../term/adjective/adjective.js")

//swap the Term object with a proper Pos class
let assign = function(t, pos, reason) {
  let mapping = {
    "verb": Verb,
    "noun": Noun,
    "value": Value,
    "adverb": Adverb,
    "adjective": Adjective
  }
  if (mapping[pos] !== undefined) {
    t = new mapping[pos](t.text)
    t.reason = reason
  }
  return t
}


let tagger = function(s) {
  s.terms = s.terms.map(function(t) {
    if (t.normal === "is") {
      t = assign(t, "verb", "because")
    }
    return t
  })

  return s.terms
}

module.exports = tagger
