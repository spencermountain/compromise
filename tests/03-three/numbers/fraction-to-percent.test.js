import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/numbers/fraction-to-percent] '

test(here + 'numeric fractions', t => {
  const cases = [
    ['0/100', '0%'],
    ['0/4', '0%'],
    ['1/2', '50%'],
    ['1/4', '25%'],
    ['3/4', '75%'],
    ['4/4', '100%'],
    ['5/4', '125%'],
    ['1000/2', '50000%'],
    ['-1/4', '-25%'],
    ['-5/4', '-125%'],
    ['1/3', '33.33%'],
    ['2/3', '66.67%'],
    ['1/6', '16.67%'],
    ['-1/6', '-16.67%'],
    ['1/8', '12.5%'],
    ['1/200', '0.5%'],
    ['1/1000', '0.1%'],
    ['4.5/100', '4.5%'],
    ['0.001/100', '0.001%'],
    ['-12.345/100', '-12.345%'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const result = doc.fractions().toPercentage()
    t.equal(doc.text(), expected, here + input)
    t.equal(result.text(), expected, here + 'returned text: ' + input)
    t.equal(doc.percentages().length, 1, here + 'percentage found: ' + input)
    t.equal(doc.fractions().length, 0, here + 'fraction removed: ' + input)
  })
  t.end()
})

test(here + 'written fractions', t => {
  const cases = [
    ['one half', '50%'],
    ['a half', '50%'],
    ['half', '50%'],
    ['a quarter', '25%'],
    ['three quarters', '75%'],
    ['two thirds', '66.67%'],
    ['five fourths', '125%'],
    ['one hundredth', '1%'],
    ['a twenty fifth', '4%'],
    ['3 out of 4', '75%'],
    ['3 out of every 4', '75%'],
    ['0 out of 4', '0%'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    t.doesNotThrow(() => doc.fractions().toPercentage(), here + 'convert: ' + input)
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})

test(here + 'punctuation and independent fractions', t => {
  const cases = [
    ['  1/4  ', '  25%  '],
    ['It was (1/4).', 'It was (25%).'],
    ['"1/4" and "3/4"', '"25%" and "75%"'],
    ['1/4; 1/2!', '25%; 50%!'],
    ['1/4\n3/4', '25%\n75%'],
    ['Use one half of the flour.', 'Use 50% of the flour.'],
    ['1/4 and 1/4, with 25% left.', '25% and 25%, with 25% left.'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.fractions().toPercentage()
    t.equal(doc.text(), expected, here + JSON.stringify(input))
  })
  t.end()
})

test(here + 'selected fractions and clones', t => {
  const original = nlp('Use 1/4 of 20 apples. Save 3/4 and 50% of the pears.')
  const doc = original.clone()
  const result = doc.fractions().eq(1).toPercentage()
  t.equal(result.text(), '75%', here + 'returned subset')
  t.equal(doc.text(), 'Use 1/4 of 20 apples. Save 75% and 50% of the pears.', here + 'selected only')
  t.equal(original.text(), 'Use 1/4 of 20 apples. Save 3/4 and 50% of the pears.', here + 'clone independent')
  doc.eq(0).fractions().toPercentage()
  t.equal(doc.text(), 'Use 25% of 20 apples. Save 75% and 50% of the pears.', here + 'bounded sentence')

  const indexed = nlp('Use 1/4 of the flour and 1/2 of the sugar.')
  indexed.fractions().toPercentage(1)
  t.equal(indexed.text(), 'Use 1/4 of the flour and 50% of the sugar.', here + 'index argument')
  t.end()
})

test(here + 'empty selections and undefined fractions', t => {
  const cases = ['', 'No fraction here.', '25 apples', '25%', '1/0', '0/0']
  cases.forEach(input => {
    const doc = nlp(input)
    t.doesNotThrow(() => doc.fractions().toPercentage(), here + 'does not throw: ' + input)
    t.equal(doc.text(), input, here + 'unchanged: ' + input)
  })
  t.end()
})

test(here + 'exact fractions round trip through percentages', t => {
  const cases = [
    ['1/4', '25/100'],
    ['3/2', '150/100'],
    ['-1/8', '-12.5/100'],
    ['0/4', '0/100'],
    ['0.001/100', '0.001/100'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.fractions().toPercentage()
    doc.percentages().toFraction()
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})
