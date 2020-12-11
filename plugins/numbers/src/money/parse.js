const currencies = require('../../data/currencies')
const parseNumber = require('../numbers/parse')

// parse 'australian dollars'
const getNamedCurrency = function (doc) {
  let m = doc.match('#Currency+')
  m.nouns().toSingular() // 'dollars'➔'dollar'
  let str = m.text('reduced')
  return currencies.find((o) => {
    // 'mexcan peso'
    let both = `${o.dem} ${o.name}`
    if (str === both) {
      return o
    }
    // 'CAD'
    if (str === o.iso) {
      return o
    }
    // 'cent'
    if (str === o.sub) {
      return o
    }
    return false
  })
}

const parseMoney = function (doc) {
  let num = parseNumber(doc).num
  let currency = getNamedCurrency(doc) || {}
  let res = Object.assign({}, currency, {
    num: num,
  })
  return res
}
module.exports = parseMoney
