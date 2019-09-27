const checkCache = function(doc, regs) {
  // check tags
  if (doc._cache) {
    for (let i = 0; i < regs.length; i++) {
      const reg = regs[i]

      if (doc._cache.tags) {
        let hasTags = doc._cache.tags
        if (reg.tag && !reg.optional && !reg.negative && !hasTags[reg.tag]) {
          // miss-cache
          // console.log('miss tag - ' + reg.tag)
          return false
        }
      }

      if (doc._cache.words) {
        let hasWords = doc._cache.words
        if (reg.word && !reg.optional && !reg.negative && !hasWords[reg.word]) {
          // miss-cache
          // console.log('miss term - ' + reg.word)
          return false
        }
      }
    }
  }

  //
  return true
}
module.exports = checkCache
