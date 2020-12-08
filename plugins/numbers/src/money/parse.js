const currencies = require('../../data/currencies')
const parseNumber = require('../numbers/parse')

const parseMoney = function (doc) {
  let res = parseNumber(doc)
  return res
}
module.exports = parseMoney
