const chunks = function (doc) {
  let carry = []
  let ptr = null
  let current = null
  doc.docs.forEach(terms => {
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
  let parts = doc.update(carry)
  // split up verb-phrases, and noun-phrases
  parts = parts.map(c => {
    if (c.has('<Noun>')) {
      return c.nouns()
    }
    // if (c.has('<Verb>')) {
    //   if (c.verbs().length > 1) {
    //     console.log(c.text())
    //   }
    // }
    return c
  })
  return parts
}
export default chunks
