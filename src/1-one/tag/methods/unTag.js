import getChildren from './_lib.js'

// remove this tag, and its children, from these terms
const unTag = function (terms, tag, tagSet) {
  tag = tag.trim().replace(/^#/, '')
  const children = getChildren(tagSet[tag]?.children)
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i]
    // don't untag anything if term is frozen
    if (term.frozen === true) {
      continue
    }
    // support clearing all tags, with '*'
    if (tag === '*') {
      term.tags.clear()
      continue
    }
    // removing #Verb should also remove #PastTense
    if (children.size > 0) {
      for (const existing of term.tags) {
        if (children.has(existing)) {
          term.tags.delete(existing)
        }
      }
    }
    term.tags.delete(tag)
  }
}
export default unTag
