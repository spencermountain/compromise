const checkCache = function(doc, regs) {
  // check tags

  // if (doc._cache && doc._cache.tags) {
  //   let hasTags = doc._cache.tags
  //   for (let i = 0; i < regs.length; i++) {
  //     const reg = regs[i]
  //     if (reg.tag && !reg.optional && !reg.negative && !hasTags[reg.tag]) {
  //       // miss-cache
  //       return false
  //     }
  //   }
  // }
  if (doc._cache && doc._cache.words) {
    let hasWords = doc._cache.words
    for (let i = 0; i < regs.length; i++) {
      const reg = regs[i]
      if (reg.word && !reg.optional && !reg.negative && !hasWords[reg.word]) {
        // miss-cache
        console.log('miss term - ' + reg.word)
        return false
      }
    }
  }

  //
  return true
}
module.exports = checkCache
