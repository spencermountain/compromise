// assume conflicts from parents
const getAllConflicts = (tag, tags) => {
  let nos = typeof tags[tag].not === 'string' ? [tags[tag].not] : tags[tag].not || []
  if (tags[tag].parents && tags[tag].parents.length > 0) {
    tags[tag].parents.forEach(parent => {
      let more = getAllConflicts(parent, tags)
      nos = nos.concat(more) //recursion
    })
  }
  return nos
}

// crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time
const inferNotTags = function (tags) {
  let keys = Object.keys(tags)
  keys.forEach(k => {
    let tag = tags[k]
    let nots = new Set(tag.not)
    // climb up the tag-tree, infer from parents
    tag.parents.forEach(parentTag => {
      if (tags[parentTag] && tags[parentTag].not) {
        // assume conflicts from parents
        getAllConflicts(parentTag, tags).forEach(nope => nots.add(nope))
      }
    })
    // any tag that lists us as a conflict, we conflict it back.
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (tags[key].not.indexOf(k) !== -1) {
        nots.add(key)
      }
    }
    // add the children, of all conflicts
    // (if it's not a #Date, it's also not a #Month)
    Array.from(nots).forEach(no => {
      if (tags[no] && tags[no].children) {
        tags[no].children.forEach(kid => nots.add(kid))
      }
    })
    // clean it up
    tag.not = Array.from(nots)
  })
  return tags
}
export default inferNotTags
