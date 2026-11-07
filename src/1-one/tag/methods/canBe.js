import getConflicts from './_lib.js'

// quick check if this tag will require any untagging
const canBe = function (term, tag, tagSet) {
  if (!Object.hasOwn(tagSet, tag)) {
    return true // everything can be an unknown tag
  }
  const conflicts = getConflicts(tagSet[tag].not)
  if (conflicts.size === 0) {
    return true
  }
  for (const existing of term.tags) {
    if (conflicts.has(existing)) {
      return false
    }
  }
  return true
}
export default canBe
