const step = {
  neighbours: require('./01-neighbours'),
  case: require('./02-case'),
  stem: require('./03-stem'),
  plural: require('./04-plurals'),
  organizations: require('./05-organizations'),
  acronyms: require('./06-acronyms'),
}
//
const fallbacks = function (doc, terms) {
  let world = doc.world

  // if it's empty, consult it's neighbours, first
  step.neighbours(terms, world)

  // is there a case-sensitive clue?
  step.case(doc)

  // check 'rewatch' as 'watch'
  step.stem(terms, world)

  // ... fallback to a noun!
  terms.forEach(t => {
    if (t.isKnown() === false) {
      t.tag('Noun', 'noun-fallback', doc.world)
    }
  })

  // turn 'Foo University' into an Org
  step.organizations(terms, world)

  //turn 'FBD' into an acronym
  step.acronyms(terms, world)

  //are the nouns singular or plural?
  terms.forEach(t => {
    step.plural(t, doc.world)
  })

  return doc
}
module.exports = fallbacks
