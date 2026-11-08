// visit every term of a nested document: fn(term, terms, t, n)
const eachTerm = (docs, fn) => {
  for (let n = 0; n < docs.length; n += 1) {
    const terms = docs[n]
    for (let t = 0; t < terms.length; t += 1) {
      fn(terms[t], terms, t, n)
    }
  }
}
export default eachTerm
