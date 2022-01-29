const max = 4

const looksOk = function (terms, ids) {
  if (terms.length !== ids.length) {
    return false
  }
  return terms.every((term, n) => term.uuid === ids[n])
}

// sweep-around looking for our term uuid
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

const lookFor = function (ids, document, n) {
  let start = findStart(ids[0], document, n)
  if (!start) {
    return null
  }
  let terms = []
  // look for how-long we can make it
  for (let i = 0; i < ids.length; i += 1) {
    let term = document[start[0]][start[1] + i]
    if (term.uuid === ids[i]) {
      terms.push(term)
    } else {
      break
    }
  }
  if (terms.length === 0) {
    return null
  }
  return [start[0], start[1], start[1] + terms.length]
}

const methods = {
  // fix a potentially-broken match
  repair: function () {
    let ptrs = []
    let document = this.document
    if (this.ptrs && this.ptrs[0] && !this.ptrs[0][3]) {
      console.warn('Compromise: .repair() called before .freeze()')//eslint-disable-line
      return this
    }
    this.ptrs.forEach(ptr => {
      let [n, i, end, ids] = ptr
      ids = ids || []
      let terms = (document[n] || []).slice(i, end)
      // we still okay?
      if (looksOk(terms, ids)) {
        ptrs.push(ptr)
      } else {
        // look-around for a fix
        let found = lookFor(ids, document, n)
        if (found) {
          ptrs.push(found)
        }
        //so, drop this match
      }
    })
    this.ptrs = ptrs
    this.frozen = false
    this.freeze()
    return this
  }
}
export default methods
