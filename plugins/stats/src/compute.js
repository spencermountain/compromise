
const compute = {
  // this is just the same thing
  // but written to Term objects
  tfidf: (view) => {
    let res = view.tfidf()
    res = res.reduce((h, a) => {
      h[a[0]] = a[1]
      return h
    }, {})
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.tfidf = res[term.root || term.implicit || term.normal] || 0
      })
    })
  }
}
export default compute