const add = require('./add')
const unTag = require('./unTag')

/** add a tag or tags, and their descendents to this term
 * @param tags {string | string[]} a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
exports.tag = function(tags, reason, world) {
  add(this, tags, reason, world)
  return this
}

/** remove a tag or tags, and their descendents from this term
 * @param tags {string | string[]} a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
exports.unTag = function(tags, reason, world) {
  unTag(this, tags, reason, world)
  return this
}
