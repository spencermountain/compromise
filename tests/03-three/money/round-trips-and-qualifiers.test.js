import test from 'tape'
import nlp from '../../lib/three.js'

test('minor currency round trips preserve value', t => {
  const cases = [
    ['50¢', 'fifty cents', '50 cents', 0.5],
    ['¢50', 'fifty cents', '50 cents', 0.5],
    ['1¢', 'one cent', '1 cent', 0.01],
    ['50 cents', 'fifty cents', '50 cents', 0.5],
    ['two pennies', 'two pennies', '2 pennies', 0.02],
    ['60 pence', 'sixty pence', '60 pence', 0.6],
  ]
  cases.forEach(([input, written, numeric, value]) => {
    const money = nlp(input).money().toText()
    t.equal(money.text(), written, input + ' toText')
    t.deepEqual(money.get(), [value], input + ' text value')
    const result = money.toNumber()
    t.equal(result.text(), numeric, input + ' toNumber')
    t.deepEqual(result.get(), [value], input + ' numeric value')
    t.equal(result.viewType, 'Money', input + ' class')
  })
  const rates = nlp.world().model.three.decimalCurrencies
  rates.token = 0.001
  const custom = nlp('25 tokens').money().toText()
  t.equal(custom.text(), 'twenty five tokens', 'custom text')
  t.deepEqual(custom.get(), [0.025], 'custom text value')
  t.equal(custom.toNumber().text(), '25 tokens', 'custom numeric')
  delete rates.token
  t.end()
})

test('explicit CAD and USD qualifiers are retained', t => {
  const cases = [
    ['$50 CAD', 'CAD', 50], ['$50CAD', 'CAD', 50], ['CAD $50', 'CAD', 50],
    ['50 CAD', 'CAD', 50], ['CAD 50', 'CAD', 50],
    ['$50 USD', 'USD', 50], ['$50USD', 'USD', 50], ['USD $50', 'USD', 50],
    ['50 usd', 'USD', 50], ['50 cents CAD', 'CAD', 0.5],
    ['CAD 50 cents', 'CAD', 0.5], ['50¢ USD', 'USD', 0.5],
    ['5 dollars and 32 cents CAD', 'CAD', 5.32],
  ]
  cases.forEach(([input, currency, amount]) => {
    const money = nlp(input).money()
    t.equal(money.text(), input, input + ' selection')
    t.deepEqual(money.currency(), [currency], input + ' currency')
    t.deepEqual(money.get(), [amount], input + ' value')
    const roundTrip = money.toText().toNumber()
    t.deepEqual(roundTrip.currency(), [currency], input + ' round trip currency')
    t.deepEqual(roundTrip.get(), [amount], input + ' round trip value')
  })
  t.equal(nlp('50 cents CAD').money().add(0.01).text(), '51 cents CAD', 'qualified minor arithmetic')
  t.equal(nlp('CAD $5.00').money().add(1).text(), 'CAD $6.00', 'prefix qualifier arithmetic')
  t.equal(nlp('$5.00CAD').money().add(1).text(), '$6.00CAD', 'attached qualifier arithmetic')
  t.deepEqual(nlp('$50').money().currency(), ['dollar'], 'bare dollar remains ambiguous')
  t.end()
})

test('decimal currency configuration edge cases', t => {
  const model = nlp.world().model.three
  const original = model.decimalCurrencies
  const existing = nlp('50 cents').money()
  model.decimalCurrencies = { cent: 0.001 }
  t.deepEqual(existing.get(), [0.05], 'existing view reads replacement table')
  t.equal(existing.add(0.001).text(), '51 cents', 'existing view arithmetic reads replacement table')
  delete model.decimalCurrencies.cent
  t.deepEqual(nlp('50 cents').money().get(), [50], 'deleted default falls back to one')
  const invalid = [0, -0.01, NaN, Infinity, '0.01', null]
  invalid.forEach(rate => {
    model.decimalCurrencies.cent = rate
    t.deepEqual(nlp('50 cents').money().get(), [50], 'invalid multiplier ' + rate)
    t.equal(nlp('50 cents').money().add(1).text(), '51 cents', 'invalid rate arithmetic ' + rate)
  })
  model.decimalCurrencies = { token: 0.01 }
  t.deepEqual(nlp('25 tokens').money().get(), [0.25], 'custom replacement table')
  delete model.decimalCurrencies.token
  t.equal(nlp('25 tokens').money().found, false, 'deleted custom unit is no longer recognized')
  model.decimalCurrencies = original
  t.deepEqual(nlp('50 cents').money().get(), [0.5], 'restore configuration')
  t.end()
})
