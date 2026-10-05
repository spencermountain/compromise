
const compute = {
  // this is just the same thing
  // but written to Term objects
  tfidf: (view) => {
    const res = Object.fromEntries(view.tfidf())
    view.docs.forEach(terms => {
      terms.forEach(term => {
        term.tfidf = res[term.root || term.implicit || term.normal] || 0
      })
    })
  }
}
export default compute
