// Keep person references inside the original document, including possessive suffixes.
const personBoundary = person => {
  const terms = person.docs[0]
  const [sentence, start, end] = person.fullPointer[0]
  let limit = terms.length
  const measurement = person.match('#Value+ #Unit').first()
  if (measurement.found) {
    const offset = measurement.fullPointer[0][1] - start
    if (terms.slice(0, offset).some(term => term.tags.has('Actor'))) {
      limit = offset
    }
  }
  // The artist's ability refers to the artist; the doctor's assistant is a person.
  const actors = terms.slice(0, limit).map((term, i) => term.tags.has('Actor') ? i : -1)
    .filter(i => i !== -1)
  const last = actors.at(-1)
  if (last !== undefined && terms[last].tags.has('Possessive')) {
    limit = last + 1
  }
  if (start + limit < end) {
    return person.update([[sentence, start, start + limit]])
  }
  return person
}

export default personBoundary
