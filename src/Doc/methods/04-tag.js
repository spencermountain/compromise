const setTag = require('./_setTag')

/** Give all terms the given tag */
exports.tag = function (tags, why) {
  if (!tags) {
    return this
  }
  setTag(tags, this, false, why)
  return this
}

/** Only apply tag to terms if it is consistent with current tags */
exports.tagSafe = function (tags, why) {
  if (!tags) {
    return this
  }
  setTag(tags, this, true, why)
  return this
}

/** Remove this term from the given terms */
exports.unTag = function (tags, why) {
  this.list.forEach(p => {
    p.terms().forEach(t => t.unTag(tags, why, this.world))
  })
  return this
}

/** return only the terms that can be this tag*/
exports.canBe = function (tag) {
  if (!tag) {
    return this
  }
  let world = this.world
  let matches = this.list.reduce((arr, p) => {
    return arr.concat(p.canBe(tag, world))
  }, [])
  return this.buildFrom(matches)
}
