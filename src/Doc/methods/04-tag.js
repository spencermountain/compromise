const setTag = require('./_tag')

/** Give all terms the given tag */
exports.tag = function(tags, why) {
  setTag(tags, this, false, why)
  return this
}

/** Only apply tag to terms if it is consistent with current tags */
exports.tagSafe = function(tag, why) {
  setTag(tag, this, true, why)
  return this
}

/** Remove this term from the given terms */
exports.untag = function(tag, why) {
  this.unfreeze()
  this.list.forEach(p => {
    p.terms().forEach(t => t.unTag(tag, why, this.world))
  })
  return this
}

/** turn on logging for decision-debugging */
exports.verbose = function(bool) {
  if (bool === undefined) {
    bool = true
  }
  this.world.verbose = bool
}
