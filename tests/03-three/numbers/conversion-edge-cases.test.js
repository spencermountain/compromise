import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/numbers/conversion-edge-cases] '

test(here + 'small decimals and exponent boundaries', t => {
  const cases = [
    ['0.000001', '0.0001%'],
    ['0.0000001', '0.00001%'],
    ['-0.0000001', '-0.00001%'],
    ['0.00000001', '0.000001%'],
    ['0.000000001', '0.0000001%'],
  ]
  cases.forEach(([decimal, percent]) => {
    const doc = nlp(decimal)
    const converted = doc.numbers().toPercentage()
    t.equal(doc.text(), percent, here + 'percentage: ' + decimal)
    converted.toDecimal()
    t.equal(doc.text(), decimal, here + 'round trip: ' + decimal)
  })
  t.end()
})

test(here + 'small decimals through fractions', t => {
  const cases = [['0.0000001', '1/10000000'], ['0.000000001', '1/1000000000'], ['-0.000001', '-1/1000000'], ['0.012345', '2469/200000']]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const fractions = doc.numbers().toFraction()
    t.equal(doc.text(), expected, here + 'fraction: ' + input)
    t.equal(fractions.text(), expected, here + 'returned fraction')
    t.equal(nlp(expected).fractions().length, 1, here + 'fresh fraction recognition')
    fractions.toDecimal()
    t.equal(doc.text(), input, here + 'exact terminating decimal')
  })
  t.end()
})

test(here + 'leading decimal points and signs', t => {
  const cases = [['.25', '25%'], ['-.25', '-25%'], ['+0.25', '+25%'], ['(.25)', '(25%)']]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.numbers().toPercentage()
    t.equal(doc.text(), expected, here + input)
  })
  const percent = nlp('It was (.5%).')
  percent.percentages().toDecimal()
  t.equal(percent.text(), 'It was (0.005).', here + 'leading decimal percentage')
  t.end()
})

test(here + 'zero fractions have written forms', t => {
  const cases = [['0/4', 'zero fourths', 'zero out of four'], ['0/2', 'zero halves', 'zero out of two']]
  cases.forEach(([input, ordinal, cardinal]) => {
    const text = nlp(input)
    text.fractions().toText()
    t.equal(text.text(), ordinal, here + 'text: ' + input)
    const ord = nlp(input)
    ord.fractions().toOrdinal()
    t.equal(ord.text(), ordinal, here + 'ordinal: ' + input)
    const card = nlp(input)
    card.fractions().toCardinal()
    t.equal(card.text(), cardinal, here + 'cardinal: ' + input)
  })
  t.end()
})

test(here + 'fraction formatting preserves meaning and selections', t => {
  const doc = nlp('Use 1/4 of the flour and 3/4 of the sugar.')
  const words = doc.fractions().toText()
  t.equal(doc.text(), 'Use one fourth of the flour and three fourths of the sugar.', here + 'written fractions')
  t.deepEqual(words.out('array'), ['one fourth', 'three fourths'], here + 'returned written selections')
  const converted = doc.fractions().toFraction()
  t.equal(doc.text(), 'Use 1/4 of the flour and 3/4 of the sugar.', here + 'back to numeric')
  t.deepEqual(converted.out('array'), ['1/4', '3/4'], here + 'returned numeric selections')
  const halves = nlp('3/2')
  halves.fractions().toText()
  t.equal(halves.text(), 'three halves', here + 'irregular plural')
  t.end()
})

test(here + 'mixed conversions and repeated calls', t => {
  const doc = nlp('0.25 and 50%')
  doc.numbers().toFraction()
  t.equal(doc.text(), '1/4 and 50/100', here + 'mixed decimal and percentage')
  doc.fractions().toPercentage()
  t.equal(doc.text(), '25% and 50%', here + 'both percentages')
  doc.percentages().toDecimal()
  t.equal(doc.text(), '0.25 and 0.5', here + 'both decimals')
  const number = nlp('0.25')
  const percentages = number.numbers().toPercentage()
  percentages.toPercentage()
  t.equal(number.text(), '25%', here + 'repeated percentage conversion')
  const decimals = number.percentages().toDecimal()
  decimals.toDecimal()
  t.equal(number.text(), '0.25', here + 'repeated decimal conversion')
  t.end()
})

test(here + 'written numbers and ordinals', t => {
  const fraction = nlp('zero point two five')
  fraction.numbers().toFraction()
  t.equal(fraction.text(), '1/4', here + 'written decimal')
  const percent = nlp('negative zero point five')
  percent.numbers().toPercentage()
  t.equal(percent.text(), '-50%', here + 'written negative decimal')
  const words = nlp('I chose the 21st option.')
  words.numbers().toText()
  t.equal(words.text(), 'I chose the twenty first option.', here + 'ordinal to text')
  words.numbers().toNumber()
  t.equal(words.text(), 'I chose the 21st option.', here + 'ordinal to number')
  t.end()
})

test(here + 'invalid fractions do not damage text', t => {
  const cases = ['1/0', '0/0']
  cases.forEach(input => {
    const doc = nlp(input)
    t.doesNotThrow(() => doc.fractions().toDecimal(), here + 'decimal: ' + input)
    t.equal(doc.text(), input, here + 'invalid decimal unchanged')
    t.doesNotThrow(() => doc.fractions().toText(), here + 'text: ' + input)
    t.equal(doc.text(), input, here + 'invalid text unchanged')
    t.doesNotThrow(() => doc.fractions().toCardinal(), here + 'cardinal: ' + input)
    t.equal(doc.text(), input, here + 'invalid cardinal unchanged')
  })
  t.end()
})
