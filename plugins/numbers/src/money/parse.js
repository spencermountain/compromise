const currencies = require('../../data/currencies')
const parseNumber = require('../numbers/parse')
// aggregate currency symbols for easy lookup
const symbols = {}
currencies.forEach((o) => {
  o.sym.forEach((str) => {
    symbols[str] = symbols[str] || o.iso
  })
  symbols[o.iso] = symbols[o.iso] || o.iso
})

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

// turn '£' into GBP
const getBySymbol = function (obj) {
  // do suffix first, for '$50CAD'
  if (obj.suffix && symbols.hasOwnProperty(obj.suffix)) {
    return currencies.find((o) => o.iso === symbols[obj.suffix])
  }
  // parse prefix for '£50'
  if (obj.prefix && symbols.hasOwnProperty(obj.prefix)) {
    return currencies.find((o) => o.iso === symbols[obj.prefix])
  }
  return null
}

const parseMoney = function (doc) {
  let res = parseNumber(doc)
  let found = getBySymbol(res) || getNamedCurrency(doc) || {}
  let sym = ''
  if (found && found.sym) {
    sym = found.sym[0]
  }
  return {
    num: res.num,
    iso: found.iso,
    demonym: found.dem,
    currency: found.name,
    plural: found.plural,
    symbol: sym,
  }
}
module.exports = parseMoney
