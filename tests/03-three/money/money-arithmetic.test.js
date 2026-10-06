import test from 'tape'
import nlp from '../_lib.js'

const here = '[three/money/money-arithmetic] '

test('money arithmetic preserves currency and class', t => {
  const cases = [
    ['i paid $5.32 for a pizza slice', 'add', 1, 'i paid $6.32 for a pizza slice', '$6.32'],
    ['i paid 5 dollars for lunch', 'add', 1, 'i paid 6 dollars for lunch', '6 dollars'],
    ['i paid five dollars for lunch', 'add', 1, 'i paid six dollars for lunch', 'six dollars'],
    ['i paid 5€ for lunch', 'subtract', 1, 'i paid 4€ for lunch', '4€'],
    ['i paid $5 for lunch', 'set', 12, 'i paid $12 for lunch', '$12'],
    ['i paid $1,200 for lunch', 'set', 1234, 'i paid $1,234 for lunch', '$1,234'],
    ['i paid five dollars for lunch', 'set', 21, 'i paid twenty one dollars for lunch', 'twenty one dollars'],
    ['i paid $5 for lunch', 'increment', undefined, 'i paid $6 for lunch', '$6'],
    ['i paid $5 for lunch', 'decrement', undefined, 'i paid $4 for lunch', '$4'],
    ['i paid $5 for lunch', 'plus', 2, 'i paid $7 for lunch', '$7'],
    ['i paid $5 for lunch', 'minus', 2, 'i paid $3 for lunch', '$3'],
  ]
  cases.forEach(([text, method, amount, expected, selection]) => {
    const doc = nlp(text)
    const result = doc.money()[method](amount)
    t.equal(doc.text(), expected, here + method)
    t.equal(result.viewType, 'Money', here + method + ' class')
    t.equal(result.text(), selection, here + method + ' selection')
    t.ok(result.currency()[0], here + method + ' currency')
  })
  t.end()
})

test('money chains and selections', t => {
  const doc = nlp('i paid 5 dollars for lunch and 10 euros for dinner')
  const money = doc.money().first().add(16).subtract(1)
  t.equal(money.viewType, 'Money', here + 'chain class')
  t.equal(money.text(), '20 dollars', here + 'chain selection')
  t.equal(doc.text(), 'i paid 20 dollars for lunch and 10 euros for dinner', here + 'scope')
  t.deepEqual(money.get(), [20], here + 'get')
  t.deepEqual(money.currency(), ['dollar'], here + 'currency')
  t.equal(doc.money().greaterThan(15).viewType, 'Money', here + 'filter class')
  t.equal(doc.money().greaterThan(15).text(), '20 dollars', here + 'filter')
  t.equal(doc.money().numbers().viewType, 'Numbers', here + 'explicit numbers')
  t.equal(nlp('nothing').money().add(1).viewType, 'Money', here + 'empty')
  t.equal(nlp('$5').money().add(0).viewType, 'Money', here + 'zero')
  t.end()
})

test('money conversions', t => {
  const doc = nlp('i paid five dollars for lunch')
  const numeric = doc.money().toNumber()
  t.equal(numeric.text(), '5 dollars', here + 'toNumber')
  t.equal(numeric.viewType, 'Money', here + 'toNumber class')
  const written = numeric.toText()
  t.equal(written.text(), 'five dollars', here + 'toText')
  t.equal(written.viewType, 'Money', here + 'toText class')
  t.equal(nlp('$1200').money().toLocaleString().text(), '$1,200', here + 'locale')
  const money = nlp('$5').money()
  ;['toOrdinal', 'toCardinal', 'toFraction'].forEach(method => {
    t.equal(money[method], undefined, here + 'omit ' + method)
  })
  t.end()
})

test('money inherits Numbers and retains separate selections', t => {
  const doc = nlp('i paid five dollars for lunch and six euros for dinner')
  const money = doc.money()
  t.ok(money instanceof doc.numbers().constructor, here + 'inherits Numbers')
  const result = money.add(16)
  t.deepEqual(result.out('array'), ['twenty one dollars', 'twenty two euros'], here + 'multiple spans')
  t.equal(doc.text(), 'i paid twenty one dollars for lunch and twenty two euros for dinner', here + 'multiple replacements')
  t.deepEqual(result.currency(), ['dollar', 'euro'], here + 'multiple currencies')
  t.deepEqual(result.subtract(16).out('array'), ['five dollars', 'six euros'], here + 'shrinking spans')
  const compound = nlp('i paid 5 dollars and 32 cents')
  const changed = compound.money().add(1)
  t.equal(compound.text(), 'i paid 6 dollars and 32 cents', here + 'compound increment')
  t.equal(changed.viewType, 'Money', here + 'compound class')
  t.end()
})

test('money-transform:', function (t) {
  let doc = nlp('i paid $5.32 for a pizza slice')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid $6.32 for a pizza slice', here + 'money-add-one')

  doc = nlp('i paid fifty eight dollars')
  doc.money().add(1)
  t.equal(doc.text(), 'i paid fifty nine dollars', here + 'text-add-one')
  t.end()
})
