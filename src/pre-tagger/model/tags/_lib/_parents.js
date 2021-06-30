const unique = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}
//add 'downward' tags (that immediately depend on this one)
const inferParents = function (tags) {
  Object.keys(tags).forEach(k => {
    let tag = tags[k]
    let len = tag.parents.length
    for (let i = 0; i < len; i++) {
      let down = tag.parents[i]
      if (tags[down]) {
        tag.parents = tag.parents.concat(tags[down].parents)
      }
    }
    // clean it up
    tag.parents = unique(tag.parents)
  })
  return tags
}
export default inferParents
