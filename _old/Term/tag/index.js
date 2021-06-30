const add = require('./add')
const unTag = require('./unTag')
const canBe = require('./canBe')

/** add a tag or tags, and their descendents to this term
 * @param  {string | string[]} tags - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
exports.tag = function (tags, reason, world) {
  add(this, tags, reason, world)
  return this
}

/** only tag this term if it's consistent with it's current tags */
exports.tagSafe = function (tags, reason, world) {
  if (canBe(this, tags, world)) {
    add(this, tags, reason, world)
  }
  return this
}

/** remove a tag or tags, and their descendents from this term
 * @param {string | string[]} tags  - a tag or tags
 * @param {string?} [reason] a clue for debugging
 */
exports.unTag = function (tags, reason, world) {
  unTag(this, tags, reason, world)
  return this
}

/** is this tag consistent with the word's current tags?
 * @param {string | string[]} tags - a tag or tags
 * @returns {boolean}
 */
exports.canBe = function (tags, world) {
  return canBe(this, tags, world)
}
