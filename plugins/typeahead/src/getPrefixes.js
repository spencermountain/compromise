const minSize = 5

// generate all the possible prefixes up-front
const createIndex = function (arr, opts) {
  let index = {}
  arr.forEach((str) => {
    str = str.toLowerCase().trim()
    let max = str.length
    if (opts.max && max > opts.max) {
      max = opts.max
    }
    let min = opts.min || minSize
    for (let size = min; size < max; size += 1) {
      let prefix = str.substr(0, size)
      index[prefix] = str
    }
  })
  return index
}
module.exports = createIndex
