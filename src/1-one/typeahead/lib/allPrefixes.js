// generate all the possible prefixes up-front
const getPrefixes = function (arr, opts, world) {
  let index = {}
  const collisions = []
  const existing = world.prefixes || {}
  arr.forEach((str) => {
    str = str.toLowerCase().trim()
    let max = str.length
    if (opts.max && max > opts.max) {
      max = opts.max
    }
    for (let size = opts.min; size < max; size += 1) {
      const prefix = str.substring(0, size)
      // ensure prefix is not a word
      if (opts.safe && Object.hasOwn(world.model.one.lexicon, prefix)) {
        continue
      }
      // does it already exist?
      if (Object.hasOwn(existing, prefix) === true) {
        collisions.push(prefix)
        continue
      }
      if (Object.hasOwn(index, prefix) === true) {
        collisions.push(prefix)
        continue
      }
      index[prefix] = str
    }
  })
  // merge with existing prefixes
  index = { ...existing, ...index }
  // remove ambiguous-prefixes
  collisions.forEach((str) => {
    delete index[str]
  })
  return index
}

export default getPrefixes
