const checkNeighbours = require('./01-neighbours')
const checkCase = require('./02-case')
const checkPlural = require('./03-plurals')
//
const fallbacks = function(doc) {
  let terms = doc.termList()
  let world = doc.world

  //if it's empty, consult it's neighbours, first
  checkNeighbours(terms, world)

  //is there a case-sensitive clue?
  checkCase(terms, world)

  //... fallback to a noun!
  terms.forEach(t => {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world)
    }
  })

  //are the nouns singular or plural?
  terms.forEach(t => {
    checkPlural(t, doc.world)
  })

  return doc
}
module.exports = fallbacks
