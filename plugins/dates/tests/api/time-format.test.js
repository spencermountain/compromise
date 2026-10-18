import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/time-format] '

test(here + 'time formatting', function (t) {
  let doc = nlp('tomorrow 5:45pm')
  doc.times().format('24h')
  t.equal(doc.text(), 'tomorrow 17:45', here + '24h')

  doc = nlp('wednesday at 2:00am')
  doc.times().format('{hour-24-pad}:{minute-pad}')
  t.equal(doc.text(), 'wednesday at 02:00', here + 'fmt')

  doc = nlp('today at 2:30pm')
  doc.times().format('24h')
  t.equal(doc.text(), 'today at 14:30', here + '24h today')

  doc = nlp('friday at 6:45am')
  doc.times().format('{hour-24-pad}:{minute-pad}')
  t.equal(doc.text(), 'friday at 06:45', here + 'fmt friday')

  doc = nlp('monday at 11:30pm')
  doc.times().format('24h')
  t.equal(doc.text(), 'monday at 23:30', here + '24h monday')

  doc = nlp('saturday at 11:30pm')
  doc.times().format('{hour-24-pad}:{minute-pad}')
  t.equal(doc.text(), 'saturday at 23:30', here + 'fmt sat')

  doc = nlp('today at 10:05am')
  doc.times().format('24h')
  t.equal(doc.text(), 'today at 10:05', here + '24h today am')
  t.end()
})
