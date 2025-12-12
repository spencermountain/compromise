import test from 'tape'
import nlp from './_lib.js'

test('text sets timezone', function (t) {
  const arr = [
    ['today', '2019-01-01T00:00:00.000Z'], //london
    ['today in PST', '2019-01-01T00:00:00.000-08:00'],
    ['today in eastern time', '2019-01-01T00:00:00.000-05:00'],
    ['today GMT+9', '2019-01-01T00:00:00.000-09:00'],
    // ['today GMT-9', '2019-01-01T00:00:00.000-09:00'],
  ]
  const context = {
    today: '2019-01-01',
    timezone: 'Europe/London',
  }
  arr.forEach((a) => {
    const doc = nlp(a[0])
    const json = doc.dates(context).json()[0] || {}
    t.equal(json.dates.start, a[1], a[0])
  })
  t.end()
})

test('set timezone context', function (t) {
  const doc = nlp('April 7th 2018')
  let json = doc.dates({ timezone: 'Asia/Karachi' }).json()[0] || {}
  t.equal(json.dates.start, '2018-04-07T00:00:00.000+05:00', '+5hrs')

  json = doc.dates({ timezone: 'Asia/Vladivostok' }).json()[0] || {}
  t.equal(json.dates.start, '2018-04-07T00:00:00.000+10:00', '+10hrs')

  t.end()
})
