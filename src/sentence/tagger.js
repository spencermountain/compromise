//part-of-speech tagging
'use strict'
let Verb = require("../term/verb/verb.js")

//swap the Term object with a proper Pos class
let assign = function(t, pos, reason) {
  let mapping = {
    "verb": Verb,
    "infinitive": Verb,
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
