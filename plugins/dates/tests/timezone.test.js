const test = require('tape')
const nlp = require('./_lib')

test('set timezone context', function(t) {
  let doc = nlp('April 7th 2018')
  let json = doc.dates({ timezone: 'Asia/Karachi' }).json()[0]
  t.equal(json.date.start, '2018-04-07T00:00:00.000+05:00', '+5hrs')

  json = doc.dates({ timezone: 'Asia/Vladivostok' }).json()[0]
  t.equal(json.date.start, '2018-04-07T00:00:00.000+10:00', '+10hrs')

  t.end()
})
