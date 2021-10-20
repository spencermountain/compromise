// search for our phrase in the document (sucks!)
const bruteSearch = function (lookUp, document) {
  for (let n = 0; n < document.length; n += 1) {
    const terms = document[n]
    for (let start = 0; start < terms.length; start += 1) {
      if (terms[start] === lookUp[0]) {
        // ensure all the terms are still there
        if (lookUp.every((term, o) => term === terms[start + o])) {
          return [n, start, start + lookUp.length]
        }
        // we can probably quit here
        return null
      }
    }
  }
  return null
}

const isSame = function (docs, frozen) {
  return docs.every((terms, i) => {
    return terms.every((term, k) => term === frozen[i][k])
  })
}

const repair = function (view) {
  let { document, frozen } = view
  // re-engineer a previous pointer
  // let tmp = methods.one.getDoc(pointer, document)
  // something has shifted, since we froze this view
  // if (isSame(tmp, frozen) === false) {
  let found = frozen.map(terms => bruteSearch(terms, document))
  found = found.filter(a => a) //remove now-missing sequences
  view.ptrs = found
}
export { repair, isSame }
