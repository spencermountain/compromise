// transfer sentence-ending punctuation
const repairPunct = function (terms, len) {
  let last = terms.length - 1
  let from = terms[last]
  let to = terms[last - len]
  if (to && from) {
    to.post += from.post //this isn't perfect.
    to.post = to.post.replace(/ +([.?!,;:])/, '$1')
    // don't allow any silly punctuation outcomes like ',!'
    to.post = to.post.replace(/[,;:]+([.?!])/, '$1')
  }
}

// remove terms from document json
const pluckOut = function (document, nots) {
  nots.forEach(ptr => {
    let [n, start, end] = ptr
    let len = end - start
    // removed.push([n, start, start + len])
    if (end === document[n].length && end > 1) {
      repairPunct(document[n], len)
    }
    document[n].splice(start, len) // replaces len terms at index start
  })
  // remove any now-empty sentences
  // (foreach + splice = 'mutable filter')
  for (let i = document.length - 1; i >= 0; i -= 1) {
    if (document[i].length === 0) {
      document.splice(i, 1)
      // remove any trailing whitespace before our removed sentence
      if (i === document.length && document[i - 1]) {
        let terms = document[i - 1]
        let lastTerm = terms[terms.length - 1]
        lastTerm.post = lastTerm.post.trimEnd()
      }
    }
  }
  return document
}

const methods = {
  /** */
  remove: function (reg) {
    const { indexN } = this.methods.one
    // two modes:
    //  - a. remove a new match, from self
    //  - b. remove self, from full parent
    // assume remove self -
    let self = this.all()
    let not = this
    // remove match
    if (reg) {
      self = this
      not = this.match(reg)
    }
    let ptrs = self.fullPointer
    let nots = not.fullPointer.reverse()
    // remove them from the actual document
    let document = pluckOut(not.document, nots)
    // repair our pointers
    let gone = indexN(nots)
    ptrs = ptrs.map(ptr => {
      let [n] = ptr
      if (!gone[n]) {
        return ptr
      }
      gone[n].forEach(no => {
        let len = no[2] - no[1]
        // does it effect our pointer?
        if (ptr[1] <= no[1] && ptr[2] >= no[2]) {
          ptr[2] -= len
        }
      })
      return ptr
    })
    // remove any now-empty pointers
    ptrs = ptrs.filter(ptr => {
      const len = ptr[2] - ptr[1]
      if (len <= 0) {
        return false
      }
      return true
    })
    // mutate original
    self.ptrs = ptrs
    self.document = document
    return self.update(ptrs) //return new document
  },
}
// aliases
methods.delete = methods.remove
export default methods
