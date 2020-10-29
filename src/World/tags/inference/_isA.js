const unique = function (arr) {
  return arr.filter((v, i, a) => a.indexOf(v) === i)
}

//add 'downward' tags (that immediately depend on this one)
const inferIsA = function (tags) {
  Object.keys(tags).forEach(k => {
    let tag = tags[k]
    let len = tag.isA.length
    for (let i = 0; i < len; i++) {
      let down = tag.isA[i]
      if (tags[down]) {
        tag.isA = tag.isA.concat(tags[down].isA)
      }
    }
    // clean it up
    tag.isA = unique(tag.isA)
  })
  return tags
}
module.exports = inferIsA
