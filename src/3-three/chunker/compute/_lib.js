const Pivot = 'Pivot'

// run fn on every term of the document
const eachTerm = (document, fn) => {
  document.forEach(terms => terms.forEach((term, t) => fn(term, terms, t)))
}

export { eachTerm, Pivot }
