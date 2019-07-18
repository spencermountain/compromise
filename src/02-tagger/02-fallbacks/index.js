const step = {
  neighbours: require('./01-neighbours'),
  case: require('./02-case'),
  plural: require('./04-plurals'),
  stem: require('./03-stem'),
}
//
const fallbacks = function(doc) {
  let terms = doc.termList()
  let world = doc.world

  // if it's empty, consult it's neighbours, first
  step.neighbours(terms, world)

  // is there a case-sensitive clue?
  step.case(terms, world)

  // check 'rewatch' as 'watch'
  step.stem(terms, world)

  // ... fallback to a noun!
  terms.forEach(t => {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world)
    }
  })

  //are the nouns singular or plural?
  terms.forEach(t => {
    step.plural(t, doc.world)
  })

  return doc
}
module.exports = fallbacks
