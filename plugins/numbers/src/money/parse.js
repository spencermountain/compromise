const currencies = require('../../data/currencies')
const parseNumber = require('../numbers/parse')

// parse 'australian dollars'
const getNamedCurrency = function (doc) {
  let m = doc.match('#Currency+')
  m.nouns().toSingular() // 'dollars'➔'dollar'
  let str = m.text('reduced')
  return currencies.find((o) => {
    // 'mexcan peso'
    if (str === `${o.dem} ${o.name}`) {
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
    // 'peso'
    if (str === o.name) {
      return o
    }
    // any other alt names
    if (o.alias && o.alias[str] === true) {
      return o
    }
    return false
  })
}

const parseMoney = function (doc) {
  let num = parseNumber(doc).num
  let found = getNamedCurrency(doc) || {}
  let sym = ''
  if (found && found.sym) {
    sym = found.sym[0]
  }
  return {
    num: num,
    iso: found.iso,
    demonym: found.dem,
    currency: found.name,
    symbol: sym,
  }
}
module.exports = parseMoney
