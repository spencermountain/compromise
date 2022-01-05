const max = 4

const findStart = function (id, doc, n) {
  for (let i = 0; i < max; i += 1) {
    // look up a sentence
    if (doc[n - i]) {
      let index = doc[n - i].findIndex(term => term.uuid === id)
      if (index !== -1) {
        return [n - i, index]
      }
    }
    // look down a sentence
    if (doc[n + i]) {
      let index = doc[n + i].findIndex(term => term.uuid === id)
      if (index !== -1) {
        return [n + i, index]
      }
    }
  }
  return null
}

const slowMode = function (view) {
  let fullPointer = view.ptrs
  let document = view.document
  // ensure all returned docs match ids
  let docs = fullPointer.map((a) => {
    let [n, i, end, ids] = a
    let terms = (document[n] || []).slice(i, end)
    // ensure 1st term is a match
    if (!terms[0] || terms[0].id !== ids[0]) {
      let start = findStart(ids[0], document, n)
      if (!start) {
        return []
      }
      // create a frankenstein set of terms, from found-start
      let s = document[start[0]]
      terms = s.slice(start[1], start[1] + ids.length)
    }
    // truncate any goofed-up matches 
    for (let i = 0; i < terms.length; i += 1) {
      if (terms[i].uuid !== ids[i]) {
        return terms.slice(0, i)
      }
    }
    return terms
  })
  docs = docs.filter(terms => terms.length > 0)
  // repair the pointer
  view.ptrs = docs.map(terms => {
    let [n, i] = terms[0].index
    let ids = terms.map(term => term.uuid)
    return [n, i, terms.length, ids]
  })
  return docs
}
export default slowMode