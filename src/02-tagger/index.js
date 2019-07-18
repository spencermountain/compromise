const lookups = require('./01-lookups')
const fallbacks = require('./02-fallbacks')
const contractions = require('./03-contractions')
const inference = require('./04-inference')
const corrections = require('./05-correction')

/** POS-tag all terms in this document */
const tagger = function(doc) {
  // check against any known-words
  doc = lookups(doc)

  // everything has gotta be something. ¯\_(:/)_/¯
  doc = fallbacks(doc)

  // support "didn't" & "spencer's"
  doc = contractions(doc)

  // deduce more specific tags - singular/plurals/quotations...
  doc = inference(doc)

  // wiggle-around the results, so they make more sense
  doc = corrections(doc)
  return doc
}
module.exports = tagger
