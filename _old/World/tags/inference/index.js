const inferColor = require('./_color')
const inferIsA = require('./_isA')
const inferNotA = require('./_notA')
const lineage = require('./_lineage')

const validate = function (tags) {
  // cleanup format
  Object.keys(tags).forEach(k => {
    let tag = tags[k]
    // ensure isA is an array
    tag.isA = tag.isA || []
    if (typeof tag.isA === 'string') {
      tag.isA = [tag.isA]
    }
    // ensure notA is an array
    tag.notA = tag.notA || []
    if (typeof tag.notA === 'string') {
      tag.notA = [tag.notA]
    }
  })
  return tags
}

// build-out the tag-graph structure
const inferTags = function (tags) {
  // validate data
  tags = validate(tags)
  // build its 'down tags'
  tags = inferIsA(tags)
  // infer the conflicts
  tags = inferNotA(tags)
  // debug tag color
  tags = inferColor(tags)
  // find incoming links
  tags = lineage(tags)
  return tags
}
module.exports = inferTags
