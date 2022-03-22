// roughly, split a document by comma or semicolon

const splitOn = function (terms, i) {
  let term = terms[i]
  // early on, these may not be dates yet:
  const maybeDate = new Set(['may', 'april', 'august', 'jan'])
  if (!term) {
    return false
  }
  // veggies, like figs
  if (term.normal === 'like' || maybeDate.has(term.normal)) {
    return false
  }
  // toronto, canada  - tuesday, march
  if (term.tags.has('Place') || term.tags.has('Date')) {
    return false
  }
  if (terms[i - 1]) {
    if (terms[i - 1].tags.has('Date') || maybeDate.has(terms[i - 1].normal)) {
      return false
    }
  }
  return true
}

// kind-of a dirty sentence chunker
const quickSplit = function (document) {
  const splitHere = /[,:;]/
  let arr = []
  document.forEach(terms => {
    let start = 0
    terms.forEach((term, i) => {
      // does it have a comma/semicolon ?
      if (splitHere.test(term.post) && splitOn(terms, i + 1)) {
        arr.push(terms.slice(start, i + 1))
        start = i + 1
      }
    })
    if (start < terms.length) {
      arr.push(terms.slice(start, terms.length))
    }
  })
  return arr
}

export default quickSplit