const inferColor = require('./_color')
const inferParents = require('./_parents')
const inferNotTags = require('./_not')
const lineage = require('./_children')

const validate = function (tags) {
  // cleanup format
  Object.keys(tags).forEach(k => {
    let tag = tags[k]
    // ensure parents is an array
    tag.parents = tag.parents || []
    if (typeof tag.parents === 'string') {
      tag.parents = [tag.parents]
    }
    // ensure notA is an array
    tag.not = tag.not || []
    if (typeof tag.not === 'string') {
      tag.not = [tag.not]
    }
  })
  return tags
}

// build-out the tag-graph structure
const inferTags = function (tags) {
  // validate data
  tags = validate(tags)
  // build its 'down tags'
  tags = inferParents(tags)
  // infer the conflicts
  tags = inferNotTags(tags)
  // debug tag color
  tags = inferColor(tags)
  // find incoming links
  tags = lineage(tags)
  return tags
}
module.exports = inferTags
