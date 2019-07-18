// const checkNeighbours = require('./01-neighbours')
const checkPlural = require('./02-plurals')
//
const fallbacks = function(doc) {
  // let terms = doc.termList()
  // let world = doc.world
  //if it's empty, consult it's neighbours, first
  // checkNeighbours(terms, world)
  // checkPlurals(terms, world)

  //fallback to a noun...
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      if (t.isKnown() === false) {
        t.tag('Noun', 'noun-fallback', doc.world)
      }
    })
  })

  //are the nouns singular or plural?
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      checkPlural(t, doc.world)
    })
  })

  return doc
}
module.exports = fallbacks
