import getConflicts from './_lib.js'
import isRequired from './_required.js'

// quick check if this tag will require any untagging
const canBe = function (term, tag, tagSet) {
  if (!Object.hasOwn(tagSet, tag)) {
    return true // everything can be an unknown tag
  }
  const { not, allow } = tagSet[tag]
  const conflicts = getConflicts(not)
  if (conflicts.size === 0) {
    return true
  }
  const hasAllow = allow && allow.length > 0
  for (const existing of term.tags) {
    if (conflicts.has(existing) && !(hasAllow && isRequired(existing, term.tags, conflicts, tagSet))) {
      return false
    }
  }
  return true
}
export default canBe
