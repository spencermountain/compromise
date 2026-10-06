import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/numbers/conversion-signs-and-chaining] '

test(here + 'negative fractions in words', t => {
  const cases = [
    ['-1/2', 'minus one half', 'minus one out of two'],
    ['-1/4', 'minus one fourth', 'minus one out of four'],
    ['-3/2', 'minus three halves', 'minus three out of two'],
    ['(-1/4)', '(minus one fourth)', '(minus one out of four)'],
  ]
  cases.forEach(([input, ordinal, cardinal]) => {
    const text = nlp(input)
    const result = text.fractions().toText()
    t.equal(text.text(), ordinal, here + 'text: ' + input)
    t.equal(result.text(), ordinal, here + 'returned text')
    const ord = nlp(input)
    ord.fractions().toOrdinal()
    t.equal(ord.text(), ordinal, here + 'ordinal: ' + input)
    const card = nlp(input)
    card.fractions().toCardinal()
    t.equal(card.text(), cardinal, here + 'cardinal: ' + input)
  })
  t.end()
})

test(here + 'already-decimal selections retain chaining', t => {
  const cases = [['0.25', '25%'], ['0', '0%'], ['-0.5', '-50%'], ['2', '200%']]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const numbers = doc.numbers().toDecimal()
    t.equal(numbers.text(), input, here + 'returned selection: ' + input)
    numbers.toPercentage()
    t.equal(doc.text(), expected, here + 'chained conversion')
  })
  const doc = nlp('Use 0.25 litres and 50 percent of the flour.')
  const numbers = doc.numbers().toDecimal()
  t.equal(doc.text(), 'Use 0.25 litres and 0.5 of the flour.', here + 'mixed forms')
  t.deepEqual(numbers.out('array'), ['0.25', '0.5'], here + 'both returned')
  numbers.toDecimal().toPercentage()
  t.equal(doc.text(), 'Use 25% litres and 50% of the flour.', here + 'repeated decimal conversion')
  const subset = nlp('Use 0.25 litres and 0.5 litres.')
  subset.numbers().eq(1).toDecimal().toPercentage()
  t.equal(subset.text(), 'Use 0.25 litres and 50% litres.', here + 'bounded selection')
  const empty = nlp('No numbers.')
  t.equal(empty.numbers().toDecimal().length, 0, here + 'empty selection')
  t.end()
})
