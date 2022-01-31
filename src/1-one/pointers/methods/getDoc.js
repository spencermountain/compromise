const max = 4

// sweep-around looking for our term uuid
const blindSweep = function (id, doc, n) {
  for (let i = 0; i < max; i += 1) {
    // look up a sentence
    if (doc[n - i]) {
      let index = doc[n - i].findIndex(term => term.id === id)
      if (index !== -1) {
        return [n - i, index]
      }
    }
    // look down a sentence
    if (doc[n + i]) {
      let index = doc[n + i].findIndex(term => term.id === id)
      if (index !== -1) {
        return [n + i, index]
      }
    }
  }
  return null
}

/** return a subset of the document, from a pointer */
const getDoc = function (ptrs, document) {
  let doc = []
  ptrs.forEach((ptr, i) => {
    if (!ptr) {
      return
    }
    let [n, start, end, id] = ptr //parsePointer(ptr)
    let terms = document[n] || []
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = terms.length
    }
    if (id && terms[start] && terms[start].id !== id) {
      // console.log('  repairing pointer...')
      let wild = blindSweep(id, document, n)
      if (wild !== null) {
        let len = end - start
        terms = document[wild[0]].slice(wild[1], wild[1] + len)
        // actually change the pointer
        ptrs[i] = [wild[0], wild[1], wild[1] + len, terms[0].id]
      }
    } else {
      terms = terms.slice(start, end)
    }
    if (terms.length === 0) {
      return
    }
    if (start === end) {
      return
    }
    // otherwise, looks good!
    doc.push(terms)
  })
  return doc
}
export default getDoc