const init = require('./01-init')
const fallbacks = require('./02-fallbacks')
const contractions = require('./03-contractions')
const corrections = require('./04-correction')

/** POS-tag all terms in this document */
const tagger = function(doc) {
  let terms = doc.termList()
  // console.time('init')
  // check against any known-words
  doc = init(doc, terms)
  // console.timeEnd('init')

  // everything has gotta be something. ¯\_(:/)_/¯
  // console.time('fallbacks')
  doc = fallbacks(doc, terms)
  // console.timeEnd('fallbacks')

  // support "didn't" & "spencer's"
  // console.time('contractions')
  doc = contractions(doc)
  // console.timeEnd('contractions')

  //set our cache, to speed things up
  doc.cache()

  // wiggle-around the results, so they make more sense
  // console.time('corrections')
  doc = corrections(doc)
  // console.timeEnd('corrections')

  //remove our cache
  doc.uncache()

  // run any user-given tagger functions
  doc.world.taggers.forEach(fn => {
    fn(doc)
  })

  return doc
}
module.exports = tagger
