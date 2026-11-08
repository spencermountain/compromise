const max = 20

// sweep-around looking for our start term uuid
const blindSweep = function (id, doc, n) {
  for (let i = 0; i < max; i += 1) {
    // look up a sentence, then down one
    for (const k of [n - i, n + i]) {
      if (doc[k]) {
        const index = doc[k].findIndex(term => term.id === id)
        if (index !== -1) {
          return [k, index]
        }
      }
    }
  }
  return null
}

const repairEnding = function (ptr, document) {
  const [n, start, , , endId] = ptr
  const terms = document[n]
  // look for end-id
  const newEnd = terms.findIndex(t => t.id === endId)
  if (newEnd === -1) {
    // if end-term wasn't found, so go all the way to the end
    ptr[2] = document[n].length
    ptr[4] = terms.length > 0 ? terms[terms.length - 1].id : null
  } else {
    ptr[2] = newEnd + 1 // repair ending pointer, which is exclusive
  }
  return document[n].slice(start, ptr[2])
}

/** return a subset of the document, from a pointer */
const getDoc = function (ptrs, document) {
  let doc = []
  ptrs.forEach((ptr, i) => {
    if (!ptr) {
      return
    }
    // eslint-disable-next-line prefer-const
    let [n, start, end, id, endId] = ptr
    let terms = document[n] || []
    if (start === undefined) {
      start = 0
    }
    if (end === undefined) {
      end = terms.length
    }
    if (id && (!terms[start] || terms[start].id !== id)) {
      // console.log('  repairing pointer...')
      const wild = blindSweep(id, document, n)
      if (wild !== null) {
        const len = end - start
        terms = document[wild[0]].slice(wild[1], wild[1] + len)
        // actually change the pointer
        const startId = terms[0] ? terms[0].id : null
        // the ending may have moved too, if its term still exists
        endId = document[wild[0]].some(term => term.id === endId) ? endId : undefined
        ptr = [wild[0], wild[1], wild[1] + len, startId, endId]
        ptrs[i] = ptr
      } else {
        // our start-term was deleted (replaced?) - trust the index, and adopt the term now there
        terms = terms.slice(start, end)
        ptr[3] = terms[0] ? terms[0].id : null
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
    // test end-id, if it exists
    if (endId && terms[terms.length - 1].id !== endId) {
      terms = repairEnding(ptr, document)
    }
    // otherwise, looks good!
    doc.push(terms)
  })
  doc = doc.filter(a => a.length > 0)
  return doc
}
export default getDoc