const hasOpen = /\(/
const hasClosed = /\)/

const findEnd = function (terms, i) {
  for (; i < terms.length; i += 1) {
    if (terms[i].post && hasClosed.test(terms[i].post)) {
      return i
    }
  }
  return null
}

const find = function () {
  let ptrs = []
  this.docs.forEach(terms => {
    let isOpen = false
    for (let i = 0; i < terms.length; i += 1) {
      let term = terms[i]
      if (!isOpen && term.pre && hasOpen.test(term.pre)) {
        let end = findEnd(terms, i)
        if (end !== null) {
          let [n, start] = terms[i].index
          ptrs.push([n, start, end + 1, terms[i].id])
          i = end
        }
      }
    }
  })
  return this.update(ptrs)
}

export default find
