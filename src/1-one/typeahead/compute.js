// lookup last word in the type-ahead prefixes
const typeahead = function (view) {
  const prefixes = view.model.one.typeahead
  const docs = view.docs
  if (docs.length === 0 || Object.keys(prefixes).length === 0) {
    return
  }
  const lastTerm = docs.at(-1)?.at(-1)
  // if we've already put whitespace, end.
  if (!lastTerm || lastTerm.post) {
    return
  }
  // if we found something
  if (Object.hasOwn(prefixes, lastTerm.normal)) {
    const found = prefixes[lastTerm.normal]
    // add full-word as an implicit result
    lastTerm.implicit = found
    lastTerm.machine = found
    lastTerm.typeahead = true
    // tag it, as our assumed term
    if (view.compute.preTagger) {
      view.last().unTag('*').compute(['lexicon', 'preTagger'])
    }
  }
}

export default { typeahead }
