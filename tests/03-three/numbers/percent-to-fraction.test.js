import test from 'tape'
import nlp from '../_lib.js'
const here = '[three/numbers/percent-to-fraction] '

test(here + 'integer and decimal percentages', t => {
  const cases = [
    ['0%', '0/100'],
    ['1%', '1/100'],
    ['42%', '42/100'],
    ['100%', '100/100'],
    ['110%', '110/100'],
    ['2000%', '2000/100'],
    ['4.5%', '4.5/100'],
    ['0.2%', '0.2/100'],
    ['0.01%', '0.01/100'],
    ['-25%', '-25/100'],
    ['-0.5%', '-0.5/100'],
    ['forty two percent', '42/100'],
    ['five per cent', '5/100'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    const fractions = doc.percentages().toFraction()
    t.equal(doc.text(), expected, here + input)
    t.equal(fractions.text(), expected, here + 'returned selection')
    t.equal(doc.fractions().length, 1, here + 'fraction selection')
  })
  t.end()
})

test(here + 'context, punctuation, and selected percentages', t => {
  const doc = nlp('We saved 20% on 3 books, and 50% on 2 pens.')
  doc.percentages().eq(1).toFraction()
  t.equal(doc.text(), 'We saved 20% on 3 books, and 50/100 on 2 pens.', here + 'selected percentage')
  doc.percentages().toFraction()
  t.equal(doc.text(), 'We saved 20/100 on 3 books, and 50/100 on 2 pens.', here + 'remaining percentage')
  t.equal(doc.percentages().length, 0, here + 'no percentages remain')
  doc.percentages().toFraction()
  t.equal(doc.text(), 'We saved 20/100 on 3 books, and 50/100 on 2 pens.', here + 'empty selection')
  const quoted = nlp('It was (42%).')
  quoted.percentages().toFraction()
  t.equal(quoted.text(), 'It was (42/100).', here + 'punctuation retained')
  t.end()
})

test(here + 'round trips and returned fraction API', t => {
  const cases = ['0%', '42%', '110%', '4.5%', '0.2%', '-25%']
  cases.forEach(input => {
    const doc = nlp(input)
    doc.percentages().toFraction().toPercentage()
    t.equal(doc.text(), input, here + input)
  })
  const doc = nlp('it was 80% of my paycheque.')
  doc.percentages().toFraction()
  t.equal(doc.text(), 'it was 80/100 of my paycheque.', here + 'original ignored case')
  doc.fractions().toPercentage()
  t.equal(doc.text(), 'it was 80% of my paycheque.', here + 'reselected round trip')
  t.end()
})

test('fraction/percent conversion', function (t) {
  const arr = [
    [`it was 80% of my paycheque.`, 'it was 80/100 of my paycheque.'],
    [`42%`, '42/100'],
    [`110%`, '110/100'],
    [`2000%`, '2000/100'],
    // [`4.5%`, '4.5/100'],
    // [`0.2%`, '0.2/100'],
  ]
  arr.forEach((a) => {
    const doc = nlp(a[0])
    doc.percentages().toFraction()
    t.equal(doc.text(), a[1], here + 'toFraction')
    doc.fractions().toPercentage()
    t.equal(doc.text(), a[0], here + 'toPercentage')
  })
  t.end()
})

test(here + 'additional percentage spellings', t => {
  const cases = [
    ['.5%', '0.5/100'],
    ['12.50%', '12.5/100'],
    ['1,250%', '1250/100'],
    ['1000000%', '1000000/100'],
    ['25 percent', '25/100'],
    ['25 per cent', '25/100'],
    ['one hundred and ten percent', '110/100'],
    ['zero percent', '0/100'],
    ['negative five percent', '-5/100'],
    ['twenty five point five percent', '25.5/100'],
    ['Fifty Percent', '50/100'],
    ['25 PERCENT', '25/100'],
    ['25 %', '25/100'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.percentages().toFraction()
    t.equal(doc.text(), expected, here + input)
  })
  t.end()
})

test(here + 'precision survives round trips', t => {
  const cases = ['0.001%', '0.0001%', '12.345%', '99.999%', '-0.001%']
  cases.forEach(input => {
    const doc = nlp(input)
    const fractions = doc.percentages().toFraction()
    t.equal(doc.text(), input.slice(0, -1) + '/100', here + 'exact numerator: ' + input)
    fractions.toPercentage()
    t.equal(doc.text(), input, here + 'exact round trip: ' + input)
  })
  t.end()
})

test(here + 'fraction data and decimal conversion', t => {
  const cases = [
    ['0%', 0, 0],
    ['25%', 25, 0.25],
    ['125%', 125, 1.25],
    ['4.5%', 4.5, 0.045],
    ['-25%', -25, -0.25],
    ['0.01%', 0.01, 0.0001],
  ]
  cases.forEach(([input, numerator, decimal]) => {
    const doc = nlp(input)
    const fractions = doc.percentages().toFraction()
    const parsed = fractions.get()[0] || {}
    t.equal(parsed.numerator, numerator, here + 'numerator: ' + input)
    t.equal(parsed.denominator, 100, here + 'denominator: ' + input)
    t.equal(parsed.decimal, decimal, here + 'decimal: ' + input)
    fractions.toDecimal()
    t.equal(doc.text(), String(decimal), here + 'toDecimal: ' + input)
  })
  t.end()
})

test(here + 'punctuation and surrounding whitespace', t => {
  const cases = [
    ['The rate is 25%. Next year it is 50%.', 'The rate is 25/100. Next year it is 50/100.'],
    ['"25%" and (50%)', '"25/100" and (50/100)'],
    ['25%; 50%!', '25/100; 50/100!'],
    ['  25%  ', '  25/100  '],
    ['25%\n50%', '25/100\n50/100'],
    ['It rose by 25 percent.', 'It rose by 25/100.'],
    ['It rose by five per cent!', 'It rose by 5/100!'],
  ]
  cases.forEach(([input, expected]) => {
    const doc = nlp(input)
    doc.percentages().toFraction()
    t.equal(doc.text(), expected, here + JSON.stringify(input))
  })
  t.end()
})

test(here + 'empty and unrelated input is unchanged', t => {
  const cases = ['', 'There was no discount.', '25 apples', '1/4 of the cake', 'percent', 'per cent']
  cases.forEach(input => {
    const doc = nlp(input)
    const fractions = doc.percentages().toFraction()
    t.equal(doc.text(), input, here + 'unchanged: ' + input)
    t.equal(fractions.length, 0, here + 'empty result: ' + input)
  })
  t.end()
})

test(here + 'returned selection excludes pre-existing fractions', t => {
  const doc = nlp('Use 1/2 of the flour and 25% of the sugar, then 10% of the milk.')
  const fractions = doc.percentages().toFraction()
  t.equal(doc.text(), 'Use 1/2 of the flour and 25/100 of the sugar, then 10/100 of the milk.', here + 'document')
  t.deepEqual(fractions.out('array'), ['25/100', '10/100'], here + 'only converted fractions')
  t.equal(doc.fractions().length, 3, here + 'all fractions remain discoverable')
  t.doesNotThrow(() => fractions.eq(1).toPercentage(), here + 'subset retains fraction API')
  t.equal(doc.text(), 'Use 1/2 of the flour and 25/100 of the sugar, then 10% of the milk.', here + 'returned subset')
  t.end()
})

test(here + 'clones and bounded selections', t => {
  const original = nlp('First 25%. Then 50%.')
  const copy = original.clone()
  copy.eq(1).percentages().toFraction()
  t.equal(original.text(), 'First 25%. Then 50%.', here + 'original unchanged')
  t.equal(copy.text(), 'First 25%. Then 50/100.', here + 'only selected sentence')

  const doc = nlp('25 percent and 50 percent')
  doc.percentages().eq(0).toFraction()
  t.equal(doc.text(), '25/100 and 50 percent', here + 'only selected spelled-out unit')
  doc.percentages().toFraction()
  t.equal(doc.text(), '25/100 and 50/100', here + 'remaining unit')
  t.end()
})

test(here + 'decimal numerators avoid arithmetic drift', t => {
  const cases = ['33.3', '66.6', '0.29', '1.1', '-12.345', '1234.56789']
  cases.forEach(value => {
    const doc = nlp(value + '%')
    const fractions = doc.percentages().toFraction()
    t.equal(doc.text(), value + '/100', here + 'numerator: ' + value)
    t.equal(fractions.get()[0]?.numerator, Number(value), here + 'parsed numerator: ' + value)
    fractions.toPercentage()
    t.equal(doc.text(), value + '%', here + 'round trip: ' + value)
  })
  t.end()
})

test(here + 'repeated percentages retain separate selections', t => {
  const doc = nlp('25% and 25%, with 25 apples and 1/4 remaining.')
  const fractions = doc.percentages().toFraction()
  t.deepEqual(fractions.out('array'), ['25/100', '25/100,'], here + 'separate results')
  fractions.eq(0).toPercentage()
  t.equal(doc.text(), '25% and 25/100, with 25 apples and 1/4 remaining.', here + 'only first result changed')
  t.end()
})
