import debug from '../../../API/debug.js'
import getChildren from './_lib.js'

// remove this tag, and its children, from these terms
const unTag = function (terms, tag, tagSet, reason = 'untag') {
  tag = tag.trim().replace(/^#/, '')
  const children = getChildren(tagSet[tag]?.children)
  for (let i = 0; i < terms.length; i += 1) {
    const term = terms[i]
    // don't untag anything if term is frozen
    if (term.frozen === true) {
      continue
    }
    const previous = debug.tags ? debug.before(term) : null
    // support clearing all tags, with '*'
    if (tag === '*') {
      term.tags.clear()
      if (previous) {
        debug.log(term, previous, reason)
      }
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
    if (previous) {
      debug.log(term, previous, reason)
    }
  }
}
export default unTag
