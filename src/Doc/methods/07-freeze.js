/** cache our document, for faster lookups */
exports.freeze = function() {
  this.cache = {
    frozen: true,
    words: {},
    tags: {},
  }
  let terms = this.termList()
  for (let i = 0; i < terms.length; i++) {
    //cache word
    this.cache.words[terms[i].normal] = true
    //cache tags
    Object.assign(this.cache.tags, terms[i].tags)
  }
  return this
}

/** delete all caches */
exports.unfreeze = function() {
  this.cache = {}
  this.parents().forEach(doc => {
    doc.cache = {}
  })
  return this
}

/** is there an active cache? */
exports.isFrozen = function() {
  return Boolean(this.cache.frozen)
}
