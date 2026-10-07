import test from 'tape'
import nlp from '../../lib/three.js'
const here = '[three/money/compound-arithmetic] '

const compoundCases = [
  ['5 dollars and 32 cents', 'add', 1, '6 dollars and 32 cents', 6.32],
  ['5 dollars and 90 cents', 'add', 0.2, '6 dollars and 10 cents', 6.1],
  ['5 dollars and 10 cents', 'subtract', 0.2, '4 dollars and 90 cents', 4.9],
  ['5 dollars and 32 cents', 'set', 1.01, '1 dollar and 1 cent', 1.01],
  ['5 dollars and 32 cents', 'set', 0, '0 dollars and 0 cents', 0],
  ['0 dollars and 32 cents', 'subtract', 1, '-0 dollars and 68 cents', -0.68],
  ['1 dollar and 20 cents', 'subtract', 2.4, '-1 dollar and 20 cents', -1.2],
  ['five dollars and thirty two cents', 'add', 1, 'six dollars and thirty two cents', 6.32],
  ['five dollars and ninety cents', 'add', 0.2, 'six dollars and ten cents', 6.1],
  ['five pounds and thirty pence', 'increment', undefined, 'six pounds and thirty pence', 6.3],
  ['5 euros and 32 cents', 'decrement', undefined, '4 euros and 32 cents', 4.32],
  ['5 dollars 32 cents USD', 'plus', 1, '6 dollars 32 cents USD', 6.32],
  ['$5 and 32 cents', 'minus', 1, '$4 and 32 cents', 4.32],
]

test(here + 'compound money arithmetic', t => {
  compoundCases.forEach(([input, method, operand, expected, value]) => {
    const doc = nlp(`i paid ${input} for lunch`)
    const result = doc.money()[method](operand)
    t.equal(doc.text(), `i paid ${expected} for lunch`, input + ' ' + method)
    t.equal(result.text(), expected, input + ' selection')
    t.equal(result.viewType, 'Money', input + ' class')
    t.deepEqual(result.get(), [value], input + ' parsed value')
  })
  const doc = nlp('i paid 5 dollars and 90 cents for lunch and 2 euros for coffee')
  const result = doc.money().first().add(0.2).subtract(0.1)
  t.equal(result.text(), '6 dollars and 0 cents', 'compound chaining')
  t.equal(doc.text(), 'i paid 6 dollars and 0 cents for lunch and 2 euros for coffee', 'limited selection')
  t.end()
})

test(here + 'money decimal formatting and signed arithmetic', t => {
  const cases = [
    ['$5.00', 'add', 1, '$6.00', 6],
    ['$0.10', 'add', 0.2, '$0.30', 0.3],
    ['$0.30', 'subtract', 0.1, '$0.20', 0.2],
    ['$1.000', 'add', 0.0001, '$1.0001', 1.0001],
    ['$1,200.50', 'add', 1, '$1,201.50', 1201.5],
    ['5.00€', 'add', 1, '6.00€', 6],
    ['5.00 dollars', 'set', 1, '1.00 dollar', 1],
    ['$5.00', 'set', 0, '$0.00', 0],
    ['$0.10', 'subtract', 0.2, '-$0.10', -0.1],
    ['-$0.10', 'add', 0.2, '$0.10', 0.1],
    ['$5.00', 'set', -1.25, '-$1.25', -1.25],
    ['$1.00', 'add', 0.0000001, '$1.0000001', 1.0000001],
  ]
  cases.forEach(([input, method, operand, expected, value]) => {
    const result = nlp(input).money()[method](operand)
    t.equal(result.text(), expected, input + ' ' + method)
    t.deepEqual(result.get(), [value], input + ' decimal value')
    t.equal(result.viewType, 'Money', input + ' class')
  })
  const result = nlp('$0.10').money().add(0.2).subtract(0.3)
  t.equal(result.text(), '$0.00', 'decimal arithmetic round trip')
  t.deepEqual(result.get(), [0], 'no negative zero')
  t.end()
})

test(here + 'compound negative and fractional-cent round trips', t => {
  const negative = nlp('minus zero dollars and sixty eight cents').money().add(1)
  t.equal(negative.text(), 'zero dollars and thirty two cents', 'negative text crosses zero')
  t.deepEqual(negative.get(), [0.32], 'negative text value')
  const minor = nlp('5 dollars and 0 cents').money().add(0.007)
  t.equal(minor.text(), '5 dollars and 0.7 cents', 'fractional cents')
  t.deepEqual(minor.get(), [5.007], 'fractional cents parsed without artifacts')
  t.equal(minor.subtract(0.007).text(), '5 dollars and 0.0 cents', 'minor decimal places retained')
  const signed = nlp('$-0.10').money().add(0.2).subtract(0.2).add(0.2)
  t.equal(signed.text(), '$0.10', 'symbol sign round trip')
  t.deepEqual(signed.get(), [0.1], 'symbol sign value')
  t.end()
})
