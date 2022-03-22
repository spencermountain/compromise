import test from 'tape'
import nlp from '../_lib.js'
const here = '[two/named-multi] '

test('two named matches', function (t) {
  let m = nlp('the big dog played').match('the [<size>#Adjective] [<animal>#Noun] played')
  t.equal(m.groups('size').text(), 'big', here + 'one-size')
  t.equal(m.groups('animal').text(), 'dog', here + 'one-animal')
  t.equal(m.groups('asdf').text(), '', here + 'one-blank')
  let res = m.groups()
  t.equal(res.size && res.size.text(), 'big', here + 'obj-size')
  t.equal(res.animal && res.animal.text(), 'dog', here + 'obj-animal')

  let doc = nlp.tokenize('june the 5th')
  m = doc.match('[<month>june] the [<date>5th]')
  t.equal(m.groups('month').text(), 'june', here + 'one-month')
  t.equal(m.groups('date').text(), '5th', here + 'one-date')
  res = m.groups()
  t.equal(res.date && res.date.text(), '5th', here + 'obj-date')
  t.equal(res.month && res.month.text(), 'june', here + 'obj-month')
  t.end()
})

test('two named - two results', function (t) {
  let doc = nlp('june the 5th and july the 7th')
  let m = doc.match('[<month>#Month] the [<date>#Value]')
  //by object
  let res = m.groups()
  t.equal(res.date.length, 2, here + '2-obj-results-date')
  t.equal(res.month.length, 2, here + '2-obj-results-month')
  t.equal(res.date.eq(0).text(), '5th', here + 'obj-date')
  t.equal(res.month.eq(0).text(), 'june', here + 'obj-month')

  let months = m.groups('month')
  t.equal(months.length, 2, here + 'found two months')
  let dates = m.groups('date')
  t.equal(dates.length, 2, here + 'found two dates')

  t.equal(months.eq(0).text(), 'june', here + 'one-month')
  t.equal(dates.eq(0).text(), '5th', here + 'one-date')

  t.equal(months.eq(1).text(), 'july', here + 'two-month')
  t.equal(dates.eq(1).text(), '7th', here + 'two-date')

  t.end()
})

test('one named - three results', function (t) {
  let doc = nlp('june the 5th, july the 7th, and sept the 12th.')
  let m = doc.match('[<month>#Month]')
  //by object
  t.equal(m.groups('month').length, 3, here + '3 months, one sentence')
  t.end()
})

test('absolute pointers', function (t) {
  let doc = nlp('i gave him two fourths of a slice')
  let m = doc.match('#Value+')
  m = m.match('#Value+')
  m = m.match('[<num>two] [<dem>fourths]')
  let { num, dem } = m.groups()
  t.equal(num.text(), 'two', here + 'num')
  t.equal(dem.text(), 'fourths', here + 'den')
  t.end()
})
