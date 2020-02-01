// remove implied tags, like 'Noun' when we have 'Plural'
const reduceTags = function(tags, world) {
  let tagset = world.tags
  let implied = []
  tags.forEach(tag => {
    if (tagset[tag] && tagset[tag].isA) {
      implied = implied.concat(tagset[tag].isA)
    }
  })
  implied = implied.reduce((h, tag) => {
    h[tag] = true
    return h
  }, {})
  tags = tags.filter(tag => !implied[tag])
  // tags
  return tags
}

module.exports = reduceTags
