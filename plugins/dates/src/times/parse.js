const parseTime = require('../parseDate/01-tokenize/03-time')
const parse = function (m, context) {
  let res = parseTime(m, context)
  return res
}
module.exports = parse
