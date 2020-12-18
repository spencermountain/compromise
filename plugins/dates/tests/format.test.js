const test = require('tape')
const nlp = require('./_lib')

test('short+long form', function (t) {
  let r = nlp('wednesday, january 2nd, 2016')
  let shorter = r.dates().toShortForm().text()
  t.equal(shorter, 'wed, jan 2nd, 2016')

  let r2 = nlp('Thurs, feb 2nd, 2016')
  let longer = r2.dates().toLongForm().text()
  t.equal(longer, 'Thursday, february 2nd, 2016')

  let doc = nlp('April, June, and Sept')
  shorter = doc.dates().toShortForm().all().text()
  t.equal(shorter, 'Apr, Jun, and Sept', 'months-short')

  longer = doc.dates().toLongForm().all().text()
  t.equal(longer, 'April, June, and September', 'months-longer')

  r2 = nlp('Thurs, feb 2nd, 2016')
  longer = r2.dates().toLongForm().text()
  t.equal(longer, 'Thursday, february 2nd, 2016')

  let str = nlp('April, June, and Sept').dates().toShortForm().all().out()
  t.equal('Apr, Jun, and Sept', str, 'toShortForm-comma')

  str = nlp('Apr, June, and Sept').dates().toLongForm().all().out()
  t.equal('April, June, and September', str, 'toShortForm-comma')

  doc = nlp('January 10, 2018 7:20 AM')
  let start = doc.dates().json()[0].date.start
  t.equal(start, '2018-01-10T07:20:00.000Z', '7:20am')

  t.end()
})

test('date-format', function (t) {
  let doc = nlp(`i'm going skiing two days after November 1st 2019 at 7pm`)
  doc.dates().format('{day} {month} {date-ordinal}, {time}')
  t.equal(doc.text(), `i'm going skiing Sunday November 3rd, 7:00pm`, 'format-test')

  doc = nlp(`halloween`)
  doc.dates().format('{month} {date-ordinal}')
  t.equal(doc.text(), `October 31st`, 'format-test-holiday')

  doc = nlp(`two days after halloween`)
  doc.dates().format('{month} {date-ordinal}, {time}')
  t.equal(doc.text(), `November 2nd, 12:00am`, 'format-test-punt')
  t.end()
})
