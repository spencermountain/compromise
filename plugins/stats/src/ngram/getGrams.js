import { getRange, countGram } from './_lib.js'

const getGrams = (list, options, edge) => {
  const { min, max } = getRange(list, options)
  const arr = []
  for (let size = min; size <= max; size += 1) {
    const grams = Object.create(null)
    list.forEach(terms => {
      const last = terms.length - size
      if (last < 0) {
        return
      }
      // Edges need only one slice per segment and size.
      if (edge) {
        const start = edge === 'end' ? last : 0
        countGram(grams, terms, start, size)
      } else {
        for (let i = 0; i <= last; i += 1) {
          countGram(grams, terms, i, size)
        }
      }
    })
    Object.values(grams).forEach(gram => arr.push(gram))
  }
  return arr
}

export default getGrams
