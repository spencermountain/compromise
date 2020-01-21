const test = require('tape')
const nlp = require('./_lib')

test('misc dates', function(t) {
  let doc = nlp('my birthday is June 5th 1998')
  t.equal(doc.dates().length, 1, 'one-date')

  let json = doc.dates().json({ normal: true })
  t.equal(json[0].normal, 'june 5th 1998', 'date-normal')
  t.end()
})

test('date-tagger', function(t) {
  let arr = [
    ['june 2009', ['Month', 'Year']],
    ['june 5th 2009', ['Month', 'Date', 'Year']],
    ['q2 2009', ['Date', 'Year']],
    ['spring 1980', ['Date', 'Year']],
    ['summer of 1999', ['Date', 'Date', 'Year']],
    ['today', ['Date']],
    ['minute', ['Duration']],
    ['valentines day', ['Holiday', 'Holiday']],
    ['ash wednesday', ['Holiday', 'Holiday']],
  ]
  arr.forEach(function(a) {
    let terms = nlp(a[0]).json(0).terms
    terms.forEach((term, i) => {
      let tag = a[1][i]
      let found = term.tags.some(tg => tg === tag)
      t.equal(found, true, term.text + ' ' + tag)
    })
  })
  t.end()
})

test('date-format', function(t) {
  let doc = nlp(`i'm going skiing two days after November 1st 2019 at 7pm`)
  // doc.dates().format('{day} {month} {date-ordinal}, {time}') //TODO: November 0th??
  // t.equal(doc.text(), `i'm going skiing Wednesday November 3rd, 7:00pm`, 'format-test')

  doc = nlp(`halloween`)
  doc.dates().format('{month} {date-ordinal}')
  t.equal(doc.text(), `October 31st`, 'format-test-holiday')

  doc = nlp(`two days after halloween`)
  doc.dates().format('{month} {date-ordinal}, {time}')
  t.equal(doc.text(), `November 2nd, 12:00am`, 'format-test-punt')
  t.end()
})

test('set today context', function(t) {
  let doc = nlp('today')
  let json = doc.dates({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.date.start, '1996-03-28T00:00:00.000-04:00', '+5hrs')

  json = doc.dates({ today: '1996-11-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.date.start, '1996-11-28T00:00:00.000-05:00', '+5hrs')
  t.end()
})

test('set timezone context', function(t) {
  let doc = nlp('April 7th 2018')
  let json = doc.dates({ timezone: 'Asia/Karachi' }).json()[0]
  t.equal(json.date.start, '2018-04-07T00:00:00.000+05:00', '+5hrs')

  json = doc.dates({ timezone: 'Asia/Vladivostok' }).json()[0]
  t.equal(json.date.start, '2018-04-07T00:00:00.000+10:00', '+10hrs')

  t.end()
})
