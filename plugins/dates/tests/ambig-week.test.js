import test from 'tape'
import nlp from './_lib.js'
import spacetime from 'spacetime'

const fmt = (iso) => (iso ? spacetime(iso).format('{iso-short}') : '-')

test('this week', function (t) {
  const arr = [
    [2020, 11, 7], //mon
    [2020, 11, 8], //tues
    [2020, 11, 9], //wed
    [2020, 11, 10], //thurs
    [2020, 11, 11], //fri
    [2020, 11, 12], //sat
    [2020, 11, 13], //sun
  ]
  arr.forEach((a) => {
    const doc = nlp('this week')
    const found = doc.dates({ today: a }).json()[0]
    t.equal(fmt(found.dates.start), '2020-12-07', 'this-start')
    t.equal(fmt(found.dates.end), '2020-12-13', 'this-end')
  })
  t.end()
})

test('last week', function (t) {
  const arr = [
    [2020, 11, 7], //mon
    [2020, 11, 8], //tues
    [2020, 11, 9], //wed
    [2020, 11, 10], //thurs
    [2020, 11, 11], //fri
    [2020, 11, 12], //sat
    [2020, 11, 13], //sun
  ]
  arr.forEach((a) => {
    const doc = nlp('last week')
    const found = doc.dates({ today: a }).json()[0]
    t.equal(fmt(found.dates.start), '2020-11-30', 'last-start')
    t.equal(fmt(found.dates.end), '2020-12-06', 'last-end')
  })
  t.end()
})

test('next week', function (t) {
  const arr = [
    [2020, 11, 7], //mon
    [2020, 11, 8], //tues
    [2020, 11, 9], //wed
    [2020, 11, 10], //thurs
    [2020, 11, 11], //fri
    [2020, 11, 12], //sat
    [2020, 11, 13], //sun
  ]
  arr.forEach((a) => {
    const doc = nlp('next week')
    const found = doc.dates({ today: a }).json()[0]
    t.equal(fmt(found.dates.start), '2020-12-14', 'last-start')
    t.equal(fmt(found.dates.end), '2020-12-20', 'last-end')
  })
  t.end()
})
