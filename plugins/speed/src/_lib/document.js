// Assemble parsed terms without running the parsing hooks again.
const fromDocs = (nlp, docs, freshIds = false) => {
  const doc = nlp('')
  doc.document = docs
  doc.compute('index')
  if (freshIds) {
    // Repeated cached sentences and separate workers can reuse term IDs.
    docs.forEach(terms => terms.forEach(term => { delete term.id }))
    doc.compute('id')
  }
  return doc
}

export default fromDocs
