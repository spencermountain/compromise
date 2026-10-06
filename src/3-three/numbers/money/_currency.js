import symbols from './currencies.js'

const minorUnits = {
  dollar: 'cent', usd: 'cent', cad: 'cent', aud: 'cent', nzd: 'cent',
  hkd: 'cent', sgd: 'cent', euro: 'cent', eur: 'cent',
  pound: 'penny', gbp: 'penny',
}

const currency = value => {
  const m = value.clone()
  let name = m.match('#Currency').first().nouns().toSingular().text('normal')
  // Pounds can be tagged as measurement units.
  if (!name) {
    name = m.match('(pound|pounds)').nouns().toSingular().text('normal')
  }
  if (!name) {
    const str = m.text()
    const found = symbols.find(([sym]) => str.includes(sym))
    if (found) {
      name = found[1]
    }
  }
  return name
}

const isMinor = (major, minor) => {
  const expected = minorUnits[currency(major).toLowerCase()]
  let unit = currency(minor).toLowerCase()
  if (unit === 'pence') {
    unit = 'penny'
  }
  return Boolean(expected && expected === unit)
}

export { currency, isMinor }
