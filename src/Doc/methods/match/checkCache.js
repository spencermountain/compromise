const checkCache = function(doc, regs) {
  // check tags

  if (doc._cache && doc._cache.tags) {
    let hasTags = doc._cache.tags
    for (let i = 0; i < regs.length; i++) {
      const reg = regs[i]
      if (reg.tag && !reg.optional && !reg.negative && !hasTags[reg.tag]) {
        // miss-cache
        return false
      }
    }
  }

  //
  return true
}
module.exports = checkCache
