import symbols from './currencies.js'

const minorUnits = {
  dollar: 'cent', usd: 'cent', cad: 'cent', aud: 'cent', nzd: 'cent',
  hkd: 'cent', sgd: 'cent', euro: 'cent', eur: 'cent',
  pound: 'penny', gbp: 'penny',
}

const decimalName = (word, world) => {
  const rates = world.model.three.decimalCurrencies
  const singular = { pennies: 'penny', paise: 'paisa' }[word] || word.replace(/s$/, '')
  if (Object.hasOwn(rates, word)) {
    return word
  }
  return Object.hasOwn(rates, singular) ? singular : ''
}

const currency = value => {
  const m = value.clone()
  let name = m.match('#Currency').first().nouns().toSingular().text('normal')
  // Pounds can be tagged as measurement units.
  if (!name) {
    name = m.match('(pound|pounds)').nouns().toSingular().text('normal')
  }
  if (!name) {
    name = decimalName(m.docs[0]?.at(-1)?.normal || '', m.world)
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

const multiplier = value => {
  const name = currency(value).toLowerCase()
  const rate = value.world.model.three.decimalCurrencies[name]
  return Number.isFinite(rate) && rate > 0 ? rate : 1
}

export { currency, isMinor, multiplier, decimalName }
