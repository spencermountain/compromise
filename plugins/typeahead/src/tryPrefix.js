const tryPrefix = function (doc, lex) {
  let world = doc.world
  // get end-part of text
  let end = doc.last()
  let m = end.terms().last()
  let json = m.json({ terms: { normal: true } })[0].terms[0]
  // if we've already put whitespace, end.
  if (json.post) {
    return
  }
  // if we found something
  if (world.prefixes.hasOwnProperty(json.normal)) {
    let found = world.prefixes[json.normal]
    // add full-word as an implicit result
    m.termList()[0].implicit = found
    // tag it too?
    if (lex.hasOwnProperty(found)) {
      m.tag(lex[found], 'typeahead')
    }
  }
}
module.exports = tryPrefix
