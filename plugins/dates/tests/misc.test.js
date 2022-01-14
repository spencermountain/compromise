import test from 'tape'
import nlp from './_lib.js'
import spacetime from 'spacetime'

const fmt = (iso) => (iso ? spacetime(iso).format('{iso-short}') : '-')

test('misc dates', function (t) {
  let doc = nlp('my birthday is June 5th 1998')
  t.equal(doc.dates().length, 1, 'one-date')

  let json = doc.dates().json({ normal: true })
  t.equal(json[0].normal, 'june 5th 1998', 'date-normal')

  t.end()
})

test('parsed today shorthand', function (t) {
  let context = {
    today: 'Dec 12th 2020',
    timezone: 'Canada/Pacific',
  }
  let doc = nlp('today')
  let found = doc.dates(context).json()[0] || {}
  t.equal(fmt(found.dates.start), '2020-12-12', 'today shorthand')
  t.end()
})

test('never allow end > start', (t) => {
  let context = {
    today: 'january 5 2018',
  }
  let arr = ['eat eggs june 5th to june 7th', 'eat eggs june 5th to 7th', 'eat eggs june 7th to june 5th']
  arr.forEach((str) => {
    let json = nlp(str).dates(context).json()[0] || {}
    let start = spacetime(json.dates.start)
    let end = spacetime(json.dates.end)
    t.equal(start.isBefore(end), true, str)
  })
  t.end()
})

test('durations are not dates', function (t) {
  let doc = nlp('it took 20 minutes')
  t.equal(doc.dates().length, 0, 'no-dates')
  t.equal(doc.durations().length, 1, 'one-duration')

  doc = nlp('it took 20mins')
  t.equal(doc.dates().length, 0, 'no-dates-compact')
  t.equal(doc.durations().length, 1, 'one-duration-compact')
  t.end()
})

test('lists of days', function (t) {
  let doc = nlp('tuesday, wednesday, or friday')
  t.equal(doc.dates().length, 3, '3-dates in list')

  doc = nlp('wednesday, friday, and sunday')
  t.equal(doc.dates().length, 3, '3-dates in AND list')

  t.end()
})

test('tagger does not mutate text', function (t) {
  let arr = ['in a hour', 'in an hour', 'jan and tues the third', 'tmrw the second', 'JAN and WeD']
  arr.forEach((str) => {
    let doc = nlp(str)
    doc.dates()
    t.equal(doc.text(), str, str)
  })
  t.end()
})
