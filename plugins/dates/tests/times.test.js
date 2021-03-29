const test = require('tape')
const spacetime = require('spacetime')
const nlp = require('./_lib')

test('times of start and end', function (t) {
  let context = {
    timezone: 'Asia/Shanghai',
    today: '2018-01-19',
  }
  let arr = [
    ['tuesday at 4', '4:00pm'],
    ['tuesday from 4 to 5pm', '4:00pm'],
    // ['tuesday from 4 to 5am', '4:00am'],
    ['tuesday at 4pm', '4:00pm'],
    ['4:00 today', '4:00pm'],
    ['4:30 in the morning', '4:30am'],
    ['between 2 and 5 tomorrow', '2:00pm'],
    ['between 3pm and 6pm tuesday', '3:00pm'],
    ['tuesday between 2 and 7pm', '2:00pm'],
    ['any tuesday from 2 to 7pm', '2:00pm'],
    ['anytime after 3', '3:00pm'],
    ['3pm-3:30', '3:00pm'],
    ['3:30pm-3:45', '3:30pm'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let dates = doc.dates(context).get(0) || {}
    let start = spacetime(dates.start)
    t.equal(start.time(), a[1], '[time] ' + a[0])
  })
  t.end()
})

test('times test', function (t) {
  let doc = nlp('it was around 4:30pm on tuesday')
  let json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.length, 1, 'found time')
  t.equal(json.time, '4:30pm', '4:30pm')

  doc = nlp('it was around 4pm on tuesday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time, '4:00pm', '4pm')

  doc = nlp('it was around 2 oclock pm on tuesday')
  json = doc.times().json()[0]
  t.equal(json.time, '2:00pm', '2 oclock')

  doc = nlp('it was around six thirty pm friday')
  json = doc.times().json()[0]
  t.equal(json.time, '6:30pm', 'six thirty pm')

  doc = nlp('it was six in the morning!')
  json = doc.times().json()[0]
  t.equal(json.time, '6:00am', 'six in the morning')

  doc = nlp('it was ten after 9')
  json = doc.times().json()[0]
  t.equal(json.time, '9:10am', 'ten after 9')
  t.end()
})
