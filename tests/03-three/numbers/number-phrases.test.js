import test from 'tape'
import nlp from '../lib.js'
const here = '[three/numbers/number-phrases] '

test('unparseable words are null:', function (t) {
  t.equal(nlp('umpteenth').numbers().parse()[0].num, null, here + 'umpteenth')
  t.equal(nlp('thirds').numbers().parse()[0].num, null, here + 'thirds')
  t.end()
})

test('repeated multipliers multiply:', function (t) {
  const arr = [
    ['a hundred million million', 100000000000000],
    ['a million million', 1000000000000],
    ['five thousand million', 5000000000],
    ['four hundred thousand million', 400000000000],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('fractions of multipliers:', function (t) {
  const arr = [
    ['a half million', 500000],
    ['half a million', 500000],
    ['one half million', 500000],
    ['a quarter million', 250000],
    ['a quarter of a million', 250000],
    ['one and a half million', 1500000],
    ['two and a half thousand', 2500],
    ['one million and a half', 1000000.5],
    ['three and a half', 3.5],
    ['five and three quarters', 5.75],
    ['two and two thirds', 2.667],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('spoken decimals with multipliers:', function (t) {
  const arr = [
    ['six point five million', 6500000],
    ['one point two billion', 1200000000],
    ['two point five thousand', 2500],
    ['zero point five', 0.5],
    ['minus one point five', -1.5],
    ['one point five', 1.5],
  ]
  arr.forEach(([str, num]) => {
    t.deepEqual(nlp(str).numbers().get(), [num], here + str)
  })
  t.end()
})

test('casual counts:', function (t) {
  t.deepEqual(nlp('a few hundred').numbers().get(), [300], here + 'a few hundred')
  t.deepEqual(nlp('a few').numbers().get(), [3], here + 'a few')
  t.end()
})

test('slash fractions convert as fractions:', function (t) {
  let doc = nlp('1/2 of them')
  doc.numbers().toText()
  t.equal(doc.text(), 'one half of them', here + 'toText')

  doc = nlp('-3/4 of them')
  doc.numbers().toText()
  t.equal(doc.text(), 'minus three fourths of them', here + 'negative toText')

  doc = nlp('2/3rds done')
  doc.numbers().toText()
  t.equal(doc.text(), 'two thirds done', here + 'ordinal suffix toText')

  doc = nlp('1/0 done')
  doc.numbers().toText()
  t.equal(doc.text(), '1/0 done', here + 'invalid fraction unchanged')

  doc = nlp('1/2 of them')
  doc.numbers().toOrdinal()
  t.equal(doc.text(), '1/2 of them', here + 'toOrdinal unchanged')

  doc = nlp('1/2 of them')
  doc.numbers().toLocaleString()
  t.equal(doc.text(), '1/2 of them', here + 'toLocaleString unchanged')

  doc = nlp('1/2 of them')
  doc.numbers().toPercentage()
  t.equal(doc.text(), '50% of them', here + 'toPercentage')
  t.end()
})
