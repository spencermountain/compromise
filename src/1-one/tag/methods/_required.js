import getTagSet from './_lib.js'

// A conflicting tag stays when a surviving tag still needs it as a parent.
// Only an `allow` exception leaves such a survivor behind.
const isRequired = function (tag, tags, conflicts, tagSet) {
  for (const other of tags) {
    if (!conflicts.has(other) && getTagSet(tagSet[other]?.parents).has(tag)) {
      return true
    }
  }
  return false
}
export default isRequired
