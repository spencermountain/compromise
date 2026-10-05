import getConflicts from '../../../tag/methods/_lib.js'

// is this tag consistent with the tags they already have?
const canBe = function (terms, tag, model) {
  const tagSet = model.one.tagSet
  if (!Object.hasOwn(tagSet, tag)) {
    return true
  }
  const conflicts = getConflicts(tagSet[tag].not)
  if (conflicts.size === 0) {
    return true
  }
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i]
    for (const existing of term.tags) {
      if (conflicts.has(existing)) {
        return false //found a tag conflict - bail!
      }
    }
  }
  return true
}
export default canBe
