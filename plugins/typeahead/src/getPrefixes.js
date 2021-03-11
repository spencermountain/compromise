// generate all the possible prefixes up-front
const createIndex = function (arr, opts, world) {
  let index = {}
  let collisions = []

  arr.forEach((str) => {
    str = str.toLowerCase().trim()
    let max = str.length
    if (opts.max && max > opts.max) {
      max = opts.max
    }
    let min = opts.min
    for (let size = min; size < max; size += 1) {
      let prefix = str.substr(0, size)
      // ensure prefix is not a word
      if (opts.safe && world.words.hasOwnProperty(prefix)) {
        continue
      }
      if (index.hasOwnProperty(prefix) === true) {
        collisions.push(prefix)
      }
      index[prefix] = str
    }
  })
  // remove ambiguous-prefixes
  collisions.forEach((str) => {
    delete index[str]
  })
  return index
}
module.exports = createIndex
