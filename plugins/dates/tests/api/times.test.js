import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/api/times] '

test(here + 'times api shape', (t) => {
  t.deepEqual(nlp('hello world').times().get(), [], 'empty is an array')
  const one = nlp('at 4:30pm').times().get(0)
  t.equal(one.time, '4:30pm', 'get(0) is an object')
  t.end()
})

test(here + 'time extraction and json', function (t) {
  let doc = nlp('it was around 4:30pm on tuesday')
  let json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()
  t.equal(json.length, 1, 'found time')
  t.equal(json[0].time.time, '4:30pm', '4:30pm')

  doc = nlp('it was around 4pm on tuesday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '4:00pm', '4pm')

  doc = nlp('it was around 2 oclock pm on tuesday')
  json = doc.times().json()[0]
  t.equal(json.time.time, '2:00pm', '2 oclock')

  doc = nlp('it was around six thirty pm friday')
  json = doc.times().json()[0]
  t.equal(json.time.time, '6:30pm', 'six thirty pm')

  doc = nlp('it was six in the morning!')
  json = doc.times().json()[0]
  t.equal(json.time.time, '6:00am', 'six in the morning')

  doc = nlp('it was ten after 9')
  json = doc.times().json()[0]
  t.equal(json.time.time, '9:10am', 'ten after 9')

  doc = nlp('around 3:30pm on tuesday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '3:30pm', '3:30pm tuesday')

  doc = nlp('at half past 3 on monday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '3:30pm', 'half past 3 monday')

  doc = nlp('at ten past 8')
  json = doc.times().json()[0]
  t.equal(json.time.time, '8:10am', 'ten past 8')

  doc = nlp('at twenty past 4')
  json = doc.times().json()[0]
  t.equal(json.time.time, '4:20pm', 'twenty past 4')

  doc = nlp('at 8:30 in the morning')
  json = doc.times().json()[0]
  t.equal(json.time.time, '8:30am', '8:30 morning')

  doc = nlp('at 7 in the evening')
  json = doc.times().json()[0]
  t.equal(json.time.time, '7:00pm', '7 evening')

  doc = nlp('at five past 3')
  json = doc.times().json()[0]
  t.equal(json.time.time, '3:05pm', 'five past 3')

  doc = nlp('around 2 oclock on friday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '2:00pm', '2 oclock friday')

  doc = nlp('it was quarter past 4')
  json = doc.times().json()[0]
  t.equal(json.time.time, '4:15pm', 'quarter past 4')

  doc = nlp('it was seven thirty am')
  json = doc.times().json()[0]
  t.equal(json.time.time, '7:30am', 'seven thirty am')

  doc = nlp('at noon on tuesday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '12:00pm', 'noon tuesday')

  doc = nlp('at midnight on friday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '12:00am', 'midnight friday')

  doc = nlp('around noon on monday')
  json = doc.times({ today: '1996-03-28', timezone: 'Canada/Eastern' }).json()[0]
  t.equal(json.time.time, '12:00pm', 'noon monday')
  t.end()
})
