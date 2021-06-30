// add a tag to all these terms
const setTag = function (terms, tag, tagSet, isSafe) {
  tag = tag.trim().replace(/^#/, '')
  let set = false
  terms: for (let i = 0; i < terms.length; i += 1) {
    let term = terms[i]
    // does it already have this tag?
    if (term.tags.has(tag) === true) {
      continue
    }
    // for known tags, do logical dependencies first
    let known = tagSet[tag]
    if (known) {
      // first, we remove any conflicting tags
      if (known.not && known.not.length > 0) {
        for (let o = 0; o < known.not.length; o += 1) {
          // if we're in tagSafe, skip this term.
          if (isSafe === true && term.tags.has(known.not[o])) {
            continue terms
          }
          term.tags.delete(known.not[o])
        }
      }
      // add parent tags
      if (known.parents && known.parents.length > 0) {
        for (let o = 0; o < known.parents.length; o += 1) {
          term.tags.add(known.parents[o])
        }
      }
    }
    // finally, add our tag
    term.tags.add(tag)
    set = true
  }
  return set
}
module.exports = setTag
