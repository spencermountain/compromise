import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/month-after-value] '

test('march and may are months after a day number', function (t) {
  const arr = [
    ['I left on 12 March.', '12', 'March'],
    ['I left on 12 May.', '12', 'May'],
    ['12 march', '12', 'march'],
    ['12 may', '12', 'may'],
    ['3 May was a Monday', '3', 'May'],
    ['12 May ended badly', '12', 'May'],
    ['5th May', '5th', 'May'],
    ['on 1st March', '1st', 'March'],
    ['on the 5th of May', '5th', 'May'],
    ['the fifth of March', 'fifth', 'March'],
    // a year before the month
    ['October 11, 1871 – March 31, 1945', '1871', 'March'],
    ['March 4, 1797 - March 4, 1801', '1797', 'March'],
  ]
  arr.forEach(([str, day, month]) => {
    const doc = nlp(str)
    t.ok(doc.match(day).has('#Date'), here + `date: '${str}'`)
    t.ok(doc.match(month).has('#Month'), here + `month: '${str}'`)
    t.notOk(doc.match(month).has('#Modal'), here + `no modal: '${str}'`)
  })
  t.end()
})

test('may is still a modal after a quantity', function (t) {
  const arr = [
    ['These 5 may leave.', '5'],
    ['All 12 may apply.', '12'],
    ['These 12 may not leave.', '12'],
    ['These 12 may also leave.', '12'],
    ['The two may leave.', 'two'],
    ['$5 may help.', '$5'],
    ['20% may leave.', '20%'],
    ['The first may leave.', 'first'],
  ]
  arr.forEach(([str, value]) => {
    const doc = nlp(str)
    const may = doc.match('may')
    t.ok(may.has('#Modal'), here + `modal: '${str}'`)
    t.notOk(may.has('#Date'), here + `not a date: '${str}'`)
    t.notOk(doc.match(value).has('#Date'), here + `value is not a date: '${str}'`)
  })
  t.end()
})

test('march is not a month after other values', function (t) {
  const arr = ['The three march on.', 'Two march in step.', 'the first march on the capital']
  arr.forEach(str => {
    const doc = nlp(str)
    t.notOk(doc.match('march').has('#Date'), here + `not a date: '${str}'`)
    t.notOk(doc.has('#Value && #Date'), here + `value is not a date: '${str}'`)
  })
  t.end()
})

test('addresses still win', function (t) {
  const doc = nlp('I live at 12 March Street.')
  t.notOk(doc.has('#Month'), here + 'no month')
  t.notOk(doc.has('#Date'), here + 'no date')
  t.end()
})
