// a lineage is all 'incoming' tags that have this as 'isA'
const inferLineage = function (tags) {
  let keys = Object.keys(tags)
  keys.forEach(k => {
    let tag = tags[k]
    tag.lineage = []
    // find all tags with it in their 'isA' set
    for (let i = 0; i < keys.length; i++) {
      if (tags[keys[i]].isA.indexOf(k) !== -1) {
        tag.lineage.push(keys[i])
      }
    }
  })
  return tags
}
module.exports = inferLineage
