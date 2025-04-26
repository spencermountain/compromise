import test from 'tape'
import spacetime from 'spacetime'
import nlp from './_lib.js'

test('set today context', function (t) {
  let doc = nlp('today')
  let json = doc.dates({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0] || {}
  t.equal(json.dates.start, '1996-03-28T00:00:00.000-04:00', '+5hrs')

  json = doc.dates({ today: '1996-11-28', timezone: 'Canada/Eastern' }).json()[0] || {}
  t.equal(json.dates.start, '1996-11-28T00:00:00.000-05:00', '+5hrs')

  doc = nlp('in 3 weeks')
  json = doc.dates({ today: '1996-03-1', timezone: 'Canada/Eastern' }).json()[0] || {}
  t.equal(json.dates.start, '1996-03-22T00:00:00.000-04:00', 'today-start')
  t.equal(json.dates.end, '1996-03-22T23:59:59.999-04:00', 'today-end')
  t.end()
})

//ensure dateRange renders as local time
test('today is always today', (t) => {
  const arr=[
    'Europe/Paris',
    'Europe/London',
    'Etc/UTC',
    'Canada/Eastern',
    'Canada/Pacific',
    'Pacific/Fiji',
    'Europe/Minsk',
    'Indian/Cocos',
    'Australia/Perth',
    'Atlantic/Canary',
    'Africa/Lome',
    null,
  ]
  arr.forEach((tz) => {
    const context = {
      timezone: tz,
      today: [2016, 11, 3],
    }
    const json = nlp('buy eggs today').dates(context).json()[0] || {}
    let start = json.dates.start
    start = spacetime(start)
    t.equal(start.format('iso-short'), '2016-12-03', 'today: ' + tz)
  })
  t.end()
})
