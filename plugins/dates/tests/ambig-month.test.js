import test from 'tape'
import nlp from './_lib.js'
import spacetime from 'spacetime'

const fmt = (iso) => (iso ? spacetime(iso).format('{iso-short}') : '-')

test('this month', function (t) {
  const arr = [
    [2020, 11, 1],
    [2020, 11, 8],
    [2020, 11, 11],
    [2020, 11, 20],
    [2020, 11, 25],
    [2020, 11, 31],
    [2020, 11, 31],
  ]
  arr.forEach((a) => {
    const doc = nlp('this month')
    const found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2020-12-01', 'this-start')
    t.equal(fmt((found.dates || {}).end), '2020-12-31', 'this-end')
  })
  t.end()
})

test('next month', function (t) {
  const arr = [
    [2020, 11, 1],
    [2020, 11, 8],
    [2020, 11, 11],
    [2020, 11, 20],
    [2020, 11, 25],
    [2020, 11, 31],
    [2020, 11, 31],
  ]
  arr.forEach((a) => {
    const doc = nlp('next month')
    const found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2021-01-01', 'next-start')
    t.equal(fmt((found.dates || {}).end), '2021-01-31', 'next-end')
  })
  t.end()
})

test('last month', function (t) {
  const arr = [
    [2020, 11, 1],
    [2020, 11, 8],
    [2020, 11, 11],
    [2020, 11, 20],
    [2020, 11, 25],
    [2020, 11, 31],
    [2020, 11, 31],
  ]
  arr.forEach((a) => {
    const doc = nlp('last month')
    const found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2020-11-01', 'last-start')
    t.equal(fmt((found.dates || {}).end), '2020-11-30', 'last-end')
  })
  t.end()
})

test('this december', function (t) {
  const arr = [
    [2020, 1, 1],
    [2020, 2, 8],
    [2020, 3, 11],
    [2020, 4, 20],
    [2020, 5, 25],
    [2020, 6, 28],
    [2020, 7, 12],
    [2020, 8, 12],
    [2020, 9, 16],
    [2020, 10, 1],
    [2020, 11, 11],
  ]
  arr.forEach((a) => {
    let doc = nlp('this december')
    let found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2020-12-01', 'this december')
    t.equal(fmt((found.dates || {}).end), '2020-12-31', 'this december')

    doc = nlp('next december')
    found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2021-12-01', 'next december')
    t.equal(fmt((found.dates || {}).end), '2021-12-31', 'next december')

    doc = nlp('last december')
    found = doc.dates({ today: a }).json()[0] || {}
    t.equal(fmt((found.dates || {}).start), '2019-12-01', 'last december')
    t.equal(fmt((found.dates || {}).end), '2019-12-31', 'last december')
  })
  t.end()
})

test('this september', function (t) {
  const doc = nlp('this september')
  let found = doc.dates({ today: [2019, 7, 4] }).json()[0] || {}
  t.equal(fmt((found.dates || {}).start), '2019-09-01', 'this sept - before')

  found = doc.dates({ today: [2019, 8, 4] }).json()[0] || {}
  t.equal(fmt((found.dates || {}).start), '2019-09-01', 'this sept - during')

  found = doc.dates({ today: [2019, 9, 4] }).json()[0] || {}
  t.equal(fmt((found.dates || {}).start), '2020-09-01', 'this sept - after')
  t.end()
})
