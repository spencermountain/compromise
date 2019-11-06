const normalize = require('./normalize')
const parseRanges = require('./parse-ranges')

const parse = function(doc) {
  doc = normalize(doc)
  return parseRanges(doc)
}
module.exports = parse
