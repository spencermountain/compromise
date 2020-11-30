const test = require('tape')
const nlp = require('./_lib')
const spacetime = require('spacetime')

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
  let found = doc.dates(context).json()[0]
  t.equal(fmt(found.date.start), '2020-12-12', 'today shorthand')
  t.end()
})

test('never allow end > start', (t) => {
  let context = {
    today: 'january 5 2018',
  }
  let arr = ['eat eggs june 5th to june 7th', 'eat eggs june 5th to 7th', 'eat eggs june 7th to june 5th']
  arr.forEach((str) => {
    let json = nlp(str).dates(context).json()[0]
    let start = spacetime(json.date.start)
    let end = spacetime(json.date.end)
    t.equal(start.isBefore(end), true, str)
  })
  t.end()
})
