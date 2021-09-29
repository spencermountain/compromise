const range = 20 // look 20 words in either direction

const chooseSense = function (terms, i, sense) {
  const term = terms[i]

  console.log(term, sense)
}

const sense = function (document, world, doc) {
  const { senses } = world.model.four
  const byTag = Object.keys(senses)
  const terms = doc.termList()
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i]
    for (let k = 0; k < byTag.length; k += 1) {
      const tag = byTag[k]
      if (term.tags.has(tag) === true && senses[tag].hasOwnProperty(term.normal) === true) {
        chooseSense(terms, i, senses[tag][term.normal])
      }
    }
  }
}
export default sense
