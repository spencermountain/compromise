const init = require('./01-init')
const fallbacks = require('./02-fallbacks')
const contractions = require('./03-contractions')
const inference = require('./04-inference')
const corrections = require('./05-correction')

/** POS-tag all terms in this document */
const tagger = function(doc) {
  // check against any known-words
  doc = init(doc)

  // everything has gotta be something. ¯\_(:/)_/¯
  doc = fallbacks(doc)

  // support "didn't" & "spencer's"
  doc = contractions(doc)

  // deduce more specific tags - singular/plurals/quotations...
  doc = inference(doc)

  //set our cache, to speed things up
  doc.freeze()

  // wiggle-around the results, so they make more sense
  doc = corrections(doc)

  //remove our cache?
  // doc.unfreeze()
  return doc
}
module.exports = tagger
