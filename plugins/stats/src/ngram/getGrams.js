const defaults = {
  max: 4,
  min: 1,
}

const oneSize = function (list, size) {
  const grams = {}
  // count each instance
  list.forEach(terms => {
    for (let i = 0; i < terms.length; i += 1) {
      const slice = terms.slice(i, i + size)
      if (slice.length === size) {
        const str = slice.join(' ')
        if (grams.hasOwnProperty(str)) {
          grams[str].count += 1
        } else {
          grams[str] = {
            size: size,
            count: 1,
          }
        }
      }
    }
  })
  // turn them into an array
  const arr = Object.keys(grams).map(k => {
    grams[k].normal = k
    return grams[k]
  })
  return arr
}

const allGrams = function (list, options) {
  // support {size:2} syntax
  if (options.size) {
    options.min = options.size
    options.max = options.size
  }
  const max = options.max || defaults.max
  const min = options.min || defaults.min
  let arr = []
  for (let size = min; size <= max; size += 1) {
    arr = arr.concat(oneSize(list, size))
  }
  return arr
}
export default allGrams
