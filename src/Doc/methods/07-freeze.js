/** cache our document, for faster lookups */
exports.freeze = function() {
  // let cache = {
  //   frozen: true,
  //   words: {},
  //   tags: {},
  // }
  // let terms = this.termList()
  // for (let i = 0; i < terms.length; i++) {
  //   //cache word
  //   cache.words[terms[i].clean] = true
  //   //cache tags
  //   Object.assign(cache.tags, terms[i].tags)
  // }
  // this.world.cache = cache
  return this
}

/** delete all caches */
exports.unfreeze = function() {
  // this.world.cache = {}
  return this
}

/** is there an active cache? */
exports.isFrozen = function() {
  // return Boolean(this.world.cache.frozen)
}
