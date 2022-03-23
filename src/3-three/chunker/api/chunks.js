const chunks = function () {
  let carry = []
  let ptr = null
  let current = null
  this.docs.forEach(terms => {
    terms.forEach(term => {
      // start a new chunk
      if (term.chunk !== current) {
        if (ptr) {
          ptr[2] = term.index[1]
          carry.push(ptr)
        }
        current = term.chunk
        ptr = [term.index[0], term.index[1]]
      }
    })
  })
  if (ptr) {
    carry.push(ptr)
  }
  let parts = this.update(carry)
  // split up verb-phrases, and noun-phrases
  parts = parts.map(c => {
    if (c.has('<Noun>')) {
      return c.nouns()
    }
    return c
  })
  return parts
}
export default chunks
