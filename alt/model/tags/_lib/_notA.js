const unique = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

// crawl the tag-graph and infer any conflicts
// faster than doing this at tag-time
const inferNotA = function (tags) {
  let keys = Object.keys(tags)
  keys.forEach(k => {
    let tag = tags[k]
    tag.notA = tag.notA || []
    tag.isA.forEach(down => {
      if (tags[down] && tags[down].notA) {
        // borrow its conflicts
        let notA = typeof tags[down].notA === 'string' ? [tags[down].isA] : tags[down].notA || []
        tag.notA = tag.notA.concat(notA)
      }
    })
    // any tag that lists us as a conflict, we conflict it back.
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (tags[key].notA.indexOf(k) !== -1) {
        tag.notA.push(key)
      }
    }
    // clean it up
    tag.notA = unique(tag.notA)
  })
  return tags
}
module.exports = inferNotA
