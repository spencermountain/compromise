//add 'downward' tags (that immediately depend on this one)
const addDownword = require('./tags/addDownward')

//extend our known tagset with these new ones
const addTags = function(tags) {
  let out = {}
  Object.keys(tags).forEach(tag => {
    let obj = tags[tag]
    obj.notA = obj.notA || []
    obj.downward = obj.downward || []
    out.tags[tag] = obj
  })
  addDownword(out.tags)
  return out
}
module.exports = addTags
