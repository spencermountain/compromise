const init = require('./01-init')
const fallbacks = require('./02-fallbacks')
const contractions = require('./03-contractions')
const corrections = require('./04-correction')

/** POS-tag all terms in this document */
const tagger = function (doc) {
  let terms = doc.termList()
  // check against any known-words
  doc = init(doc, terms)
  // everything has gotta be something. ¯\_(:/)_/¯
  doc = fallbacks(doc, terms)
  // support "didn't" & "spencer's"
  doc = contractions(doc)
  //set our cache, to speed things up
  doc.cache()
  // wiggle-around the results, so they make more sense
  doc = corrections(doc)
  // remove our cache, as it's invalidated now
  doc.uncache()
  // run any user-given tagger functions
  doc.world.taggers.forEach(fn => {
    fn(doc)
  })
  return doc
}
module.exports = tagger
