// Avoid rebuilding every phrase's pointers when a split rule has no matches.
const split = (doc, method, pattern, group) => {
  const matches = doc.match(pattern, group)
  if (!matches.found) {
    return doc
  }
  return doc[method](matches)
}

export default split
