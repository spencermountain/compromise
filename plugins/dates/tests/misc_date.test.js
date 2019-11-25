const test = require('tape')
const nlp = require('./_lib')

test('short+long form', function(t) {
  let r = nlp('wednesday, january 2nd, 2016')
  let shorter = r
    .dates()
    .toShortForm()
    .text()
  t.equal(shorter, 'wed, jan 2nd, 2016')

  let r2 = nlp('Thurs, feb 2nd, 2016')
  let longer = r2
    .dates()
    .toLongForm()
    .text()
  t.equal(longer, 'Thursday, february 2nd, 2016')

  let doc = nlp('April, June, and Sept')
  shorter = doc
    .dates()
    .toShortForm()
    .all()
    .text()
  t.equal(shorter, 'Apr, Jun, and Sept', 'months-short')

  longer = doc
    .dates()
    .toLongForm()
    .all()
    .text()
  t.equal(longer, 'April, June, and September', 'months-longer')

  r2 = nlp('Thurs, feb 2nd, 2016')
  longer = r2
    .dates()
    .toLongForm()
    .text()
  t.equal(longer, 'Thursday, february 2nd, 2016')

  let str = nlp('April, June, and Sept')
    .dates()
    .toShortForm()
    .all()
    .out()
  t.equal('Apr, Jun, and Sept', str, 'toShortForm-comma')

  str = nlp('Apr, June, and Sept')
    .dates()
    .toLongForm()
    .all()
    .out()
  t.equal('April, June, and September', str, 'toShortForm-comma')

  // doc = nlp('January 10, 2018 7:20 AM')
  // let obj = doc.dates().json()[0].date
  // t.equal(obj.month, 0, 'month')
  // t.equal(obj.date, 10, 'date')
  // t.equal(obj.year, 2018, 'year')
  // t.equal(obj.time.hour, 7, 'hour')
  // t.equal(obj.time.minute, 20, 'minute')

  t.end()
})
