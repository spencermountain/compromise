const unique = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

// crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time
const inferNotTags = function (tags) {
  let keys = Object.keys(tags)
  keys.forEach(k => {
    let tag = tags[k]
    tag.not = tag.not || []
    tag.parents.forEach(down => {
      if (tags[down] && tags[down].not) {
        // borrow its conflicts
        let not = typeof tags[down].not === 'string' ? [tags[down].parents] : tags[down].not || []
        tag.not = tag.not.concat(not)
      }
    })
    // any tag that lists us as a conflict, we conflict it back.
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (tags[key].not.indexOf(k) !== -1) {
        tag.not.push(key)
      }
    }
    // clean it up
    tag.not = unique(tag.not)
  })
  return tags
}
module.exports = inferNotTags
