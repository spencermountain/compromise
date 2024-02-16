import test from 'tape'
import nlp from './_lib.js'
const here = ' [dates/before-after] '

test('isBefore misc', function (t) {
  let doc = nlp('i went on June 5th 1999 and then on April 7 2008')
  let m = doc.dates().isBefore('2000-02-01')
  t.deepEqual(m.out('array'), ['June 5th 1999'], here + 'days')

  doc = nlp('and between Sept 2008 and Oct 2008 but then June 2010')
  m = doc.dates().isBefore('2009-01')
  t.deepEqual(m.out('array'), ['between Sept 2008 and Oct 2008'], here + 'months')

  doc = nlp('only in 2018 and 2020')
  m = doc.dates().isBefore('2019')
  t.deepEqual(m.out('array'), ['in 2018'], here + 'years')

  doc = nlp('saw him 2024/02/05 and 2024/03/09')
  m = doc.dates().isBefore('2025')
  t.deepEqual(m.out('array'), ['2024/02/05', '2024/03/09'], here + 'isos')

  t.end()
})

test('isAfter misc', function (t) {
  let doc = nlp('i went on June 5th 1999 and then on April 7 2008')
  let m = doc.dates().isAfter('2000-02-01')
  t.deepEqual(m.out('array'), ['April 7 2008'], here + 'after-days')

  doc = nlp('saw him 2024/02/05 and 2024/03/09')
  m = doc.dates().isAfter('2020')
  t.deepEqual(m.out('array'), ['2024/02/05', '2024/03/09'], here + 'after-isos')

  t.end()
})

test('isSame', function (t) {
  let doc = nlp('i went on June 5th 1999 and then on April 7 2008')
  let m = doc.dates().isSame('year', '1999')
  t.deepEqual(m.out('array'), ['June 5th 1999'], here + 'same-year')

  doc = nlp('saw him 2024-02-05 and 2024-03-09')
  m = doc.dates().isSame('month', '2024-03-17')
  t.deepEqual(m.out('array'), ['2024-03-09'], here + 'same-month')

  t.end()
})
