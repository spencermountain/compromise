const checkNeighbours = require('./01-neighbours')
//
const fallbacks = function(doc) {
  let terms = doc.termList()
  let world = doc.world
  //if it's empty, consult it's neighbours, first
  checkNeighbours(terms, world)

  //fallback to a noun...
  doc.list.forEach(p => {
    p.terms().forEach(t => {
      if (t.isKnown() === false) {
        t.tag('Noun', 'noun-fallback')
      }
    })
  })
  return doc
}
module.exports = fallbacks
