const test = require('tape')
const nlp = require('../_lib')

test('two named matches', function (t) {
  let m = nlp('the big dog played').match('the [<size>#Adjective] [<animal>#Noun] played')
  t.equal(m.groups('size').text(), 'big', 'one-size')
  t.equal(m.groups('animal').text(), 'dog', 'one-animal')
  t.equal(m.groups('asdf').text(), '', 'one-blank')
  let res = m.groups()
  t.equal(res.size.text(), 'big', 'obj-size')
  t.equal(res.animal.text(), 'dog', 'obj-animal')

  let doc = nlp.tokenize('june the 5th')
  m = doc.match('[<month>june] the [<date>5th]')
  t.equal(m.groups('month').text(), 'june', 'one-month')
  t.equal(m.groups('date').text(), '5th', 'one-date')
  res = m.groups()
  t.equal(res.date.text(), '5th', 'obj-date')
  t.equal(res.month.text(), 'june', 'obj-month')
  t.end()
})

test('two named - two results', function (t) {
  let doc = nlp('june the 5th and july the 7th')
  let m = doc.match('[<month>#Month] the [<date>#Value]')
  //by object
  let res = m.groups()
  t.equal(res.date.length, 2, '2-obj-results-date')
  t.equal(res.month.length, 2, '2-obj-results-month')
  t.equal(res.date.eq(0).text(), '5th', 'obj-date')
  t.equal(res.month.eq(0).text(), 'june', 'obj-month')

  let months = m.groups('month')
  t.equal(months.length, 2, 'found two months')
  let dates = m.groups('date')
  t.equal(dates.length, 2, 'found two dates')

  t.equal(months.eq(0).text(), 'june', 'one-month')
  t.equal(dates.eq(0).text(), '5th', 'one-date')

  t.equal(months.eq(1).text(), 'july', 'two-month')
  t.equal(dates.eq(1).text(), '7th', 'two-date')

  t.end()
})

test('one named - three results', function (t) {
  let doc = nlp('june the 5th, july the 7th, and sept the 12th.')
  let m = doc.match('[<month>#Month]')
  //by object
  t.equal(m.groups('month').length, 3, '3 months, one sentence')
  t.end()
})
