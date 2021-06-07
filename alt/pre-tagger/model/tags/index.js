const nouns = require('./nouns')
const verbs = require('./verbs')
const values = require('./values')
const misc = require('./misc')
const inferTags = require('./_lib')

let tags = Object.assign({}, nouns, verbs, values, misc)
// do the graph-stuff
tags = inferTags(tags)

module.exports = tags
