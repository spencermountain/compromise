const normalize = require('./01-normalize')
const parseRanges = require('./02-ranges')

const parse = function(doc, context) {
  doc = normalize(doc)
  return parseRanges(doc, context)
}
module.exports = parse
