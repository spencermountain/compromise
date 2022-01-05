
/** return a subset of the document, from a pointer */
const getDoc = function (pointer, document) {
  let doc = []
  pointer.forEach(ptr => {
    if (!ptr) {
      return
    }
    let [n, start, end] = ptr //parsePointer(ptr)
    let terms = document[n] || []
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = terms.length
    }
    terms = terms.slice(start, end)
    if (terms.length > 0) {
      doc.push(terms)
    }
  })
  return doc
}
export default getDoc