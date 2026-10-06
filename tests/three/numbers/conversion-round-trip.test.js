import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/number-conversions] '

test(here + 'decimal to fraction', t => {
  const cases = [['0.25', '1/4'], ['0.5', '1/2'], ['0.125', '1/8'], ['1.5', '3/2'], ['-0.25', '-1/4'], ['0', '0/1'], ['2', '2/1'], ['0.001', '1/1000'], ['0.29', '29/100'], ['1.01', '101/100']]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const fractions = doc.numbers().toFraction()
    t.equal(doc.text(), expected, here + input)
    t.equal(fractions.text(), expected, here + 'returned fraction')
    t.equal(typeof fractions.toDecimal, 'function', here + 'fraction API')
  })
  t.end()
})

test(here + 'decimal and percentage conversion', t => {
  const cases = [['0.25', '25%'], ['1.5', '150%'], ['-0.125', '-12.5%'], ['0', '0%'], ['0.29', '29%'], ['0.00001', '0.001%']]
  cases.forEach(([decimal, percent]) => {
    const doc = nlp(decimal)
    const percentages = doc.numbers().toPercentage()
    t.equal(doc.text(), percent, here + decimal)
    const numbers = percentages.toDecimal()
    t.equal(doc.text(), decimal, here + 'back to decimal')
    t.equal(numbers.text(), decimal, here + 'returned number')
  })
  const written = nlp('It rose by twenty five percent.')
  written.percentages().toDecimal()
  t.equal(written.text(), 'It rose by 0.25.', here + 'written percentage')
  const spaced = nlp('five per cent')
  spaced.percentages().toDecimal()
  t.equal(spaced.text(), '0.05', here + 'per cent')
  t.end()
})

test(here + 'circular round trips', t => {
  const cases = ['0', '0.25', '0.125', '1.5', '-0.25', '0.29', '0.001']
  cases.forEach(input => {
    const doc = nlp(input)
    doc.numbers().toFraction().toPercentage().percentages().toDecimal()
    t.equal(doc.text(), input, here + 'decimal → fraction → percentage → decimal')
    doc.numbers().toPercentage().toFraction().toDecimal()
    t.equal(doc.text(), input, here + 'decimal → percentage → fraction → decimal')
  })
  const doc = nlp('0.25')
  doc.numbers().toFraction().toText()
  t.equal(doc.text(), 'one fourth', here + 'fraction to text')
  doc.fractions().toFraction().fractions().toDecimal()
  t.equal(doc.text(), '0.25', here + 'written fraction round trip')
  t.end()
})

test(here + 'context and selected values', t => {
  const doc = nlp('Mix 0.25 litres with 20 apples and 0.5 litres with 10 pears.')
  doc.numbers().eq(0).toPercentage()
  t.equal(doc.text(), 'Mix 25% litres with 20 apples and 0.5 litres with 10 pears.', here + 'selected number')
  doc.percentages().toDecimal()
  t.equal(doc.text(), 'Mix 0.25 litres with 20 apples and 0.5 litres with 10 pears.', here + 'selected percentage')
  const quoted = nlp('It was (0.25).')
  quoted.numbers().toFraction()
  t.equal(quoted.text(), 'It was (1/4).', here + 'punctuation')
  const existing = nlp('25%')
  existing.numbers().toPercentage()
  t.equal(existing.text(), '25%', here + 'already percentage')
  const empty = nlp('No numbers here.')
  empty.numbers().toFraction()
  empty.numbers().toPercentage().toDecimal()
  t.equal(empty.text(), 'No numbers here.', here + 'empty selection')
  t.end()
})
