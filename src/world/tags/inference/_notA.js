const unique = function(arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

// crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time
const inferNotA = function(tags) {
  Object.keys(tags).forEach(k => {
    let tag = tags[k]
    tag.notA = tag.notA || []
    tag.isA.forEach(down => {
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        let notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || []
        tag.notA = tag.notA.concat(notA)
      }
    })
    // clean it up
    tag.notA = unique(tag.notA)
  })
  return tags
}
module.exports = inferNotA
