// select spans wrapped by paired punctuation held in term.pre / term.post
const findPairs = (hasOpen, findEnd) => doc => {
  const ptrs = []
  doc.docs.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const term = terms[i]
      if (term.pre && hasOpen.test(term.pre)) {
        const end = findEnd(terms, i)
        if (end !== null) {
          const [n, start] = terms[i].index
          // i and end are relative to this view, but start is not
          ptrs.push([n, start, start + end - i + 1, terms[i].id])
          i = end
        }
      }
    }
  })
  return doc.update(ptrs)
}

// remove the opening and closing punctuation from each span
const stripPairs = (hasOpen, hasClosed) => m => {
  m.docs.forEach(terms => {
    terms[0].pre = terms[0].pre.replace(hasOpen, '')
    const last = terms[terms.length - 1]
    last.post = last.post.replace(hasClosed, '')
  })
  return m
}

export { findPairs, stripPairs }
