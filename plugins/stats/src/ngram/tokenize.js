// Preserve each selected segment as an n-gram boundary.
const tokenize = doc => doc.docs.map(terms => terms.map(term => term.normal))

export default tokenize
