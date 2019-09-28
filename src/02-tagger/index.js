const init = require('./01-init')
const fallbacks = require('./02-fallbacks')
const contractions = require('./03-contractions')
const inference = require('./04-inference')
const corrections = require('./05-correction')

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

  // deduce more specific tags - singular/plurals/quotations...
  // console.time('inference')
  doc = inference(doc)
  // console.timeEnd('inference')

  //set our cache, to speed things up
  // doc.cache()

  // wiggle-around the results, so they make more sense
  // console.time('corrections')
  doc = corrections(doc)
  // console.timeEnd('corrections')

  //remove our cache?
  // doc.unfreeze()
  return doc
}
module.exports = tagger
