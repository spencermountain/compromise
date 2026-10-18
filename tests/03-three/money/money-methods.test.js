import test from 'tape'
import nlp from '../../lib/three.js'

const here = '[three/money/money-methods] '
const input = 'i paid 5 dollars for lunch and 10 euros for dinner'

test('money output methods', t => {
  const money = nlp(input).money()
  t.deepEqual(money.parse(), [{ currency: 'dollar', num: 5 }, { currency: 'euro', num: 10 }], here + 'parse')
  t.deepEqual(money.parse(1), [{ currency: 'euro', num: 10 }], here + 'parse nth')
  t.deepEqual(money.get(), [5, 10], here + 'get')
  t.deepEqual(money.get(1), [10], here + 'get nth')
  t.deepEqual(money.currency(), ['dollar', 'euro'], here + 'currency')
  t.deepEqual(money.currency(1), ['euro'], here + 'currency nth')
  t.deepEqual(money.json().map(row => row.money), money.parse(), here + 'json')
  t.doesNotThrow(() => {
    t.deepEqual(money.json(1).map(row => row.money), [{ currency: 'euro', num: 10 }], here + 'json nth')
  }, here + 'json nth does not throw')
  t.equal(nlp(input).money(1).text(), '10 euros', here + 'money nth')
  t.equal(money.text(), '5 dollars 10 euros', here + 'text')
  t.deepEqual(money.out('array'), ['5 dollars', '10 euros'], here + 'out')
  t.end()
})

test('money comparison and selection methods', t => {
  const cases = [
    ['isEqual', [5], ['5 dollars']],
    ['equals', [10], ['10 euros']],
    ['greaterThan', [5], ['10 euros']],
    ['lessThan', [10], ['5 dollars']],
    ['between', [5, 10], []],
    ['isBetween', [4, 11], ['5 dollars', '10 euros']],
    ['isOrdinal', [], []],
    ['isCardinal', [], ['5 dollars', '10 euros']],
    ['isUnit', ['kilograms'], []],
    ['first', [], ['5 dollars']],
    ['last', [], ['10 euros']],
    ['eq', [1], ['10 euros']],
    ['slice', [0, 1], ['5 dollars']],
    ['filter', [m => m.get()[0] > 5], ['10 euros']],
  ]
  cases.forEach(([method, args, expected]) => {
    const doc = nlp(input)
    const result = doc.money()[method](...args)
    t.deepEqual(result.out('array'), expected, here + method)
    t.equal(result.viewType, 'Money', here + method + ' class')
    t.equal(doc.text(), input, here + method + ' leaves document intact')
  })
  t.deepEqual(nlp(input).money().units().out('array'), ['dollars', 'euros'], here + 'currency units')
  t.end()
})

test('money arithmetic methods and aliases', t => {
  const cases = [
    ['set', [8], 8], ['add', [2], 7], ['plus', [2], 7],
    ['subtract', [2], 3], ['minus', [2], 3],
    ['increment', [], 6], ['decrement', [], 4],
    ['add', [0], 5], ['subtract', [0], 5], ['set', [0], 0],
    ['add', ['two'], 7], ['set', ['eight'], 8],
  ]
  cases.forEach(([method, args, expected]) => {
    const doc = nlp('i paid $5 for lunch')
    const result = doc.money()[method](...args)
    t.equal(doc.text(), `i paid $${expected} for lunch`, here + method + ' ' + args)
    t.equal(result.text(), `$${expected}`, here + method + ' selection')
    t.equal(result.viewType, 'Money', here + method + ' class')
    t.deepEqual(result.get(), [expected], here + method + ' parsed result')
    t.deepEqual(result.currency(), ['dollar'], here + method + ' currency')
  })
  t.end()
})

test('money formatting methods and aliases', t => {
  const cases = [
    ['five dollars', 'toNumber', '5 dollars'],
    ['5 dollars', 'toText', 'five dollars'],
    ['$5', 'toText', 'five dollars'],
    ['$1200', 'toLocaleString', '$1,200'],
    ['$1200', 'toNice', '$1,200'],
    ['1200 euros', 'toLocaleString', '1,200 euros'],
    ['1200€', 'toNice', '1,200€'],
  ]
  cases.forEach(([inputText, method, expected]) => {
    const doc = nlp(`i paid ${inputText} for lunch`)
    const result = doc.money()[method]()
    t.equal(result.text(), expected, here + method + ' selection')
    t.equal(doc.text(), `i paid ${expected} for lunch`, here + method + ' document')
    t.equal(result.viewType, 'Money', here + method + ' class')
    t.ok(result.currency()[0], here + method + ' retains currency')
  })
  t.end()
})

test('money empty output and transformations', t => {
  const money = nlp('no amounts here').money()
  const readers = ['parse', 'get', 'currency', 'json']
  readers.forEach(method => {
    t.deepEqual(money[method](), [], here + 'empty ' + method)
  })
  const methods = ['set', 'add', 'plus', 'subtract', 'minus', 'increment', 'decrement',
    'toNumber', 'toText', 'toLocaleString', 'toNice', 'isEqual', 'equals',
    'greaterThan', 'lessThan', 'between', 'isBetween', 'isOrdinal', 'isCardinal', 'isUnit']
  methods.forEach(method => {
    const result = money[method](1, 2)
    t.equal(result.viewType, 'Money', here + 'empty ' + method + ' class')
    t.equal(result.found, false, here + 'empty ' + method + ' selection')
  })
  t.end()
})

test('money clone, numeric escape hatch and excluded methods', t => {
  const doc = nlp('i paid 5 dollars')
  const clone = doc.money().clone().add(1)
  t.equal(clone.viewType, 'Money', here + 'clone class')
  t.equal(clone.text(), '6 dollars', here + 'clone arithmetic')
  t.equal(doc.text(), 'i paid 5 dollars', here + 'clone independence')
  const money = doc.money()
  const omitted = ['toOrdinal', 'toCardinal', 'toFraction']
  omitted.forEach(method => {
    t.equal(money[method], undefined, here + 'excluded ' + method)
    t.equal(typeof money.numbers()[method], 'function', here + 'numbers exposes ' + method)
  })
  t.equal(money.numbers().viewType, 'Numbers', here + 'numbers class')
  t.equal(money.values().viewType, 'Numbers', here + 'values alias')
  t.deepEqual(money.numbers().get(), [5], here + 'numeric value')
  t.end()
})
