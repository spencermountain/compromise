import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/money/decimal-currencies] '

test(here + 'minor currencies parse in major units', t => {
  const cases = [
    ['1 cent', 0.01], ['50 cents', 0.5], ['125 cents', 1.25],
    ['50 centavos', 0.5], ['50 centimes', 0.5], ['50 paise', 0.5],
    ['one penny', 0.01], ['two pennies', 0.02], ['sixty pence', 0.6],
    ['0.7 cents', 0.007], ['-50 cents', -0.5], ['50¢', 0.5],
    ['5 dollars and 32 cents', 5.32], ['50 dollars', 50],
  ]
  cases.forEach(([input, expected]) => {
    const money = nlp(input).money()
    t.deepEqual(money.get(), [expected], input + ' get')
    t.equal(money.parse()[0]?.num, expected, input + ' parse')
    t.equal(money.json()[0]?.money.num, expected, input + ' json')
  })
  const money = nlp('50 cents').money()
  t.deepEqual(money.currency(), ['cent'], 'retain the written currency name')
  t.equal(money.lessThan(1).text(), '50 cents', 'comparisons use the scaled value')
  t.deepEqual(money.numbers().get(), [50], 'plain numbers retain the written value')
  t.end()
})

test(here + 'minor currency arithmetic uses major units and preserves the unit', t => {
  t.equal(nlp('50 cents').money().add(1).text(), '150 cents', 'add a major unit')
  t.equal(nlp('50 cents').money().add(0.01).text(), '51 cents', 'add a minor unit')
  t.equal(nlp('50 cents').money().set(0.01).text(), '1 cent', 'set and agree')
  t.equal(nlp('two pennies').money().subtract(0.01).text(), 'one penny', 'written minor units')
  t.equal(nlp('50¢').money().add(0.01).text(), '51¢', 'cent symbol')
  t.deepEqual(nlp('0.7 cents').money().add(0.001).get(), [0.008], 'fractional cent arithmetic')
  t.end()
})

test(here + 'decimal currency multipliers are configurable in the world model', t => {
  const rates = nlp.world().model.three.decimalCurrencies
  t.equal(rates.cent, 0.01, 'default cent multiplier')
  const original = rates.cent
  rates.cent = 0.001
  t.deepEqual(nlp('50 cents').money().get(), [0.05], 'configuration applies to plural form')
  t.equal(nlp('50 cents').money().add(0.001).text(), '51 cents', 'arithmetic uses configured multiplier')
  t.deepEqual(nlp('5 dollars and 32 cents').money().get(), [5.032], 'compound parse uses configured multiplier')
  t.equal(nlp('5 dollars and 999 cents').money().add(0.001).text(), '6 dollars and 0 cents', 'configured carry')
  rates.cent = original
  rates.token = 0.01
  t.deepEqual(nlp('25 tokens').money().get(), [0.25], 'custom currency')
  delete rates.token
  t.end()
})
