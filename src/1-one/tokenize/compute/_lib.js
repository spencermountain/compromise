// visit every term in a nested document
const eachTerm = (docs, fn) => {
  for (let i = 0; i < docs.length; i += 1) {
    for (let t = 0; t < docs[i].length; t += 1) {
      fn(docs[i][t], i, t)
    }
  }
}
export default eachTerm
