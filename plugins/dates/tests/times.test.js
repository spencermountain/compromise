const test = require('tape')
const nlp = require('./_lib')

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
