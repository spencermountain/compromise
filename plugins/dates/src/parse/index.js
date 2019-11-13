const normalize = require('./01-normalize')
const parseRanges = require('./02-ranges')

const parse = function(doc) {
  doc = normalize(doc)
  return parseRanges(doc)
}
module.exports = parse
