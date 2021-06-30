const nouns = require('./nouns')
const verbs = require('./verbs')
const values = require('./values')
const misc = require('./misc')
const inferTags = require('./inference')

const build = () => {
  let tags = Object.assign({}, nouns, verbs, values, misc)
  // do the graph-stuff
  tags = inferTags(tags)
  return tags
}
module.exports = build()
