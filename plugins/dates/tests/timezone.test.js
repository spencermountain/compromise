import test from 'tape'
import nlp from './_lib.js'

test('text sets timezone', function (t) {
  const arr = [
    ['today', '2019-01-01T00:00:00.000Z'], //london
    ['today in PST', '2019-01-01T00:00:00.000-08:00'],
    ['today in eastern time', '2019-01-01T00:00:00.000-05:00'],
    ['today GMT+9', '2019-01-01T00:00:00.000-09:00'],
    ['tomorrow', '2019-01-02T00:00:00.000Z'],
    ['yesterday', '2018-12-31T00:00:00.000Z'],
    ['tomorrow in PST', '2019-01-02T00:00:00.000-08:00'],
    ['yesterday in PST', '2018-12-31T00:00:00.000-08:00'],
    ['today in pacific time', '2019-01-01T00:00:00.000-08:00'],
    ['today in pacific standard time', '2019-01-01T00:00:00.000-08:00'],
    ['today in EST', '2019-01-01T00:00:00.000-05:00'],
    ['today in est', '2019-01-01T00:00:00.000-05:00'],
    ['today in EDT', '2019-01-01T00:00:00.000-05:00'],
    ['today in CST', '2019-01-01T00:00:00.000-05:00'],
    ['today in MST', '2019-01-01T00:00:00.000-07:00'],
    ['today in PDT', '2019-01-01T00:00:00.000-08:00'],
    ['today in central time', '2019-01-01T00:00:00.000-06:00'],
    ['today in mountain time', '2019-01-01T00:00:00.000-07:00'],
    ['today in alaskan time', '2019-01-01T00:00:00.000-09:00'],
    ['today in hawaiian time', '2019-01-01T00:00:00.000-10:00'],
    ['today in hawaii time', '2019-01-01T00:00:00.000-10:00'],
    ['today in atlantic time', '2019-01-01T00:00:00.000-04:00'],
    ['today in newfoundland time', '2019-01-01T00:00:00.000-03:30'],
    ['today in eastern standard time', '2019-01-01T00:00:00.000-05:00'],
    ['today in pacific daylight time', '2019-01-01T00:00:00.000-08:00'],
    ['today in central standard time', '2019-01-01T00:00:00.000-06:00'],
    ['today in mountain standard time', '2019-01-01T00:00:00.000-07:00'],
    ['today in GMT', '2019-01-01T00:00:00.000Z'],
    ['today in gmt', '2019-01-01T00:00:00.000Z'],
    ['today in UTC', '2019-01-01T00:00:00.000Z'],
    ['today in utc', '2019-01-01T00:00:00.000Z'],
    ['today GMT+0', '2019-01-01T00:00:00.000Z'],
    ['today GMT+1', '2019-01-01T00:00:00.000-01:00'],
    ['today GMT+5', '2019-01-01T00:00:00.000-05:00'],
    ['today GMT+8', '2019-01-01T00:00:00.000-08:00'],
    ['today UTC+5', '2019-01-01T00:00:00.000+05:00'],
    ['today utc+5', '2019-01-01T00:00:00.000+05:00'],
    ['today in GMT+5', '2019-01-01T00:00:00.000-05:00'],
    ['today in central european time', '2019-01-01T00:00:00.000+01:00'],
    ['today in CET', '2019-01-01T00:00:00.000+01:00'],
    ['today in british time', '2019-01-01T00:00:00.000Z'],
    ['today in BST', '2019-01-01T00:00:00.000Z'],
    ['today in MSK', '2019-01-01T00:00:00.000+03:00'],
    ['today in japan time', '2019-01-01T00:00:00.000+09:00'],
    ['today in JST', '2019-01-01T00:00:00.000Z'],
    ['today in australian eastern standard time', '2019-01-01T00:00:00.000+10:00'],
    ['today in AEST', '2019-01-01T00:00:00.000+10:00'],
    ['today in peru time', '2019-01-01T00:00:00.000-05:00'],
    ['today in brazil time', '2019-01-01T00:00:00.000-03:00'],
    ['today in argentina time', '2019-01-01T00:00:00.000-03:00'],
    ['today in venezuela time', '2019-01-01T00:00:00.000-04:00'],
    ['january 1st in PST', '2019-01-01T00:00:00.000-08:00'],
    ['january 1st in eastern time', '2019-01-01T00:00:00.000-05:00'],
    ['jan 1 in pacific time', '2019-01-01T00:00:00.000-08:00'],
    ['jan 1 in GMT+9', '2019-01-01T00:00:00.000-09:00'],
    ['2019-01-01 in PST', '2019-01-01T00:00:00.000-08:00'],
    ['2019-01-01 in eastern time', '2019-01-01T00:00:00.000-05:00'],
    ['on january 1st in PST', '2019-01-01T00:00:00.000-08:00'],
    ['9am PST', '2019-01-01T09:00:00.000-08:00'],
    ['4pm eastern time', '2019-01-01T16:00:00.000-05:00'],
    ['noon pacific time', '2019-01-01T12:00:00.000-08:00'],
    ['march 15th in PST', '2019-03-15T00:00:00.000-07:00'],
    ['march 15th in eastern time', '2019-03-15T00:00:00.000-04:00'],
    ['february 2nd in central time', '2019-02-02T00:00:00.000-06:00'],
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
  const phrase = 'April 7th 2018'
  const arr = [
    { tz: 'Asia/Karachi', start: '2018-04-07T00:00:00.000+05:00' },
    { tz: 'Asia/Vladivostok', start: '2018-04-07T00:00:00.000+10:00' },
    { tz: 'Asia/Tokyo', start: '2018-04-07T00:00:00.000+09:00' },
    { tz: 'Asia/Shanghai', start: '2018-04-07T00:00:00.000+08:00' },
    { tz: 'Asia/Kolkata', start: '2018-04-07T00:00:00.000+05:30' },
    { tz: 'Asia/Dubai', start: '2018-04-07T00:00:00.000+04:00' },
    { tz: 'Asia/Singapore', start: '2018-04-07T00:00:00.000+08:00' },
    { tz: 'Asia/Bangkok', start: '2018-04-07T00:00:00.000+07:00' },
    { tz: 'Europe/London', start: '2018-04-07T00:00:00.000+01:00' },
    { tz: 'Europe/Paris', start: '2018-04-07T00:00:00.000+02:00' },
    { tz: 'Europe/Berlin', start: '2018-04-07T00:00:00.000+02:00' },
    { tz: 'Europe/Moscow', start: '2018-04-07T00:00:00.000+03:00' },
    { tz: 'America/New_York', start: '2018-04-07T00:00:00.000-04:00' },
    { tz: 'America/Los_Angeles', start: '2018-04-07T00:00:00.000-07:00' },
    { tz: 'America/Chicago', start: '2018-04-07T00:00:00.000-05:00' },
    { tz: 'America/Denver', start: '2018-04-07T00:00:00.000-06:00' },
    { tz: 'America/Toronto', start: '2018-04-07T00:00:00.000-04:00' },
    { tz: 'America/Vancouver', start: '2018-04-07T00:00:00.000-07:00' },
    { tz: 'America/Sao_Paulo', start: '2018-04-07T00:00:00.000-03:00' },
    { tz: 'America/Mexico_City', start: '2018-04-07T00:00:00.000-06:00' },
    { tz: 'Australia/Sydney', start: '2018-04-07T00:00:00.000+10:00' },
    { tz: 'Australia/Perth', start: '2018-04-07T00:00:00.000+08:00' },
    { tz: 'Pacific/Auckland', start: '2018-04-07T00:00:00.000+12:00' },
    { tz: 'Pacific/Honolulu', start: '2018-04-07T00:00:00.000-10:00' },
    { tz: 'Africa/Cairo', start: '2018-04-07T00:00:00.000+02:00' },
    { tz: 'Africa/Johannesburg', start: '2018-04-07T00:00:00.000+02:00' },
    { tz: 'Canada/Eastern', start: '2018-04-07T00:00:00.000-04:00' },
    { tz: 'Canada/Pacific', start: '2018-04-07T00:00:00.000-07:00' },
  ]
  arr.forEach((a) => {
    const json = nlp(phrase).dates({ timezone: a.tz }).json()[0] || {}
    t.equal(json.dates.start, a.start, a.tz)
  })
  t.end()
})
