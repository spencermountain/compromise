const nouns = require('./tags/nouns')
const verbs = require('./tags/verbs')
const values = require('./tags/values')
const misc = require('./tags/misc')
const inferTags = require('./inference/index')

//extend tagset with new tags
const addIn = function (obj, tags) {
  Object.keys(obj).forEach(k => {
    tags[k] = obj[k]
  })
}

const build = () => {
  let tags = {}
  addIn(nouns, tags)
  addIn(verbs, tags)
  addIn(values, tags)
  addIn(misc, tags)
  // do the graph-stuff
  tags = inferTags(tags)
  return tags
}
module.exports = build()
