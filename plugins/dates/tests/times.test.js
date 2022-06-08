import test from 'tape'
import spacetime from 'spacetime'
import nlp from './_lib.js'
const here = ' [dates/times] '

test('times of start and end', function (t) {
  let context = {
    timezone: 'Asia/Shanghai',
    today: '2018-01-19T10:05:00',
  }
  let arr = [
    ['tuesday at 4', '4:00pm'],
    ['tuesday from 4 to 5pm', '4:00pm', '5:00pm'],
    // ['tuesday from 4 to 5am', '4:00am'],
    ['tuesday at 4pm', '4:00pm'],
    ['4:00 today', '4:00pm'],
    ['4:30 in the morning', '4:30am'],
    ['4:30 in the evening', '4:30pm'],
    ['4 in the morning', '4:00am'],
    ['4 in the evening', '4:00pm'],
    ['between 2 and 5 tomorrow', '2:00pm', '5:00pm'],
    ['between 3pm and 6pm tuesday', '3:00pm', '6:00pm'],
    ['tuesday between 2 and 7pm', '2:00pm', '7:00pm'],
    ['tuesday from 2 to 7pm', '2:00pm', '7:00pm'],
    // ['any tuesday from 2 to 7pm', '2:00pm'],
    ['tuesday from 2pm', '2:00pm'],
    ['anytime after 3', '3:00pm'],
    ['3pm-3:30', '3:00pm', '3:30pm'],
    ['3:30pm-3:45', '3:30pm', '3:45pm'],
    ['wednesday from 3 to 4', '3:00pm', '4:00pm'],
    ['3 to 4 on wednesday', '3:00pm', '4:00pm'],
    ['tue from 6pm to 8', '6:00pm', '8:00pm'],
    ['11 to 9 january 5th', '11:00am'],
    ['11am to 9 january 5th', '11:00am', '9:00pm'],
    ['11 to 9pm january 5th', '11:00am', '9:00pm'],
    ['9-5 on tuesday', '9:00am', '5:00pm'],
    ['9-5 tuesday', '9:00am', '5:00pm'],
    ['june 5 from 3-5pm', '3:00pm', '5:00pm'],
    ['june 5 from 3-5', '3:00pm', '5:00pm'],
    ['3-5pm on june 5th ', '3:00pm', '5:00pm'],
    ['3pm-5pm on june 5th ', '3:00pm', '5:00pm'],
    ['2pm to 5pm march 9', '2:00pm', '5:00pm'],
    ['tomorrow 3 to 7', '3:00pm', '7:00pm'],
    ['anytime after 10 oclock pm', '10:00pm'],
    ['4pm to 5pm', '4:00pm', '5:00pm'],
    ['4pm to 5:32pm', '4:00pm', '5:32pm'],
    ['between 4pm and 5pm', '4:00pm'],
    ['between 4pm and 5pm on june 4', '4:00pm', '5:00pm'],
    ['4pm or 5pm', '4:00pm'],
    ['wednesday at 3', '3:00pm'],
    ['wednesday at 3pm', '3:00pm'],
    ['3pm to 7 tomorrow', '3:00pm', '7:00pm'],
    ['between 3 and 6 tuesday', '3:00pm', '6:00pm'],
    ['sometime after 4', '4:00pm'],
    ['sometime after 11pm', '11:00pm'],
    ['ten past three', '3:10pm'],
    ['in a hour', '11:05am'],
    ['in an hour from now', '11:05am'],
    ['in one hour from now', '11:05am'],
    // ['in half an hour from now', '10:35am'],
    ['next monday at 9', '9:00am'],
    // ['half three', '3:30pm'],
    // ['at 10 to three', '2:50pm'],
    [`@2:99`, '2:59pm'],
    // [`ten to 4pm`, '3:50pm'],
    [`9am to 5:49pm`, '9:00am', '5:49pm'],
    // [`ten to 4 in the morning`, '3:50am'],
    [`wed between 2 - 5pm`, '2:00pm', '5:00pm'],
    [`tues at 3pm to 5pm`, '3:00pm', '5:00pm'],
    [`june 4 at 2pm - 9pm`, '2:00pm', '9:00pm'],
    // [`june 4 at ten past 8`, '8:10pm'],
  ]
  arr.forEach((a) => {
    let doc = nlp(a[0])
    let dates = doc.dates(context).get()[0] || {}
    let start = spacetime(dates.start)
    t.equal(start.time(), a[1], '[time] ' + a[0])
    if (a[2]) {
      t.equal(spacetime(dates.end).time(), a[2], '[end] ' + a[0])
    }
  })
  t.end()
})

test('times test', function (t) {
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
  t.end()
})

test('times test', function (t) {
  let doc = nlp('tomorrow 5:45pm')
  doc.times().format('24h')
  t.equal(doc.text(), 'tomorrow 17:45', here + '24h')

  doc = nlp('wednesday at 2:00am')
  doc.times().format('{hour-24-pad}:{minute-pad}')
  t.equal(doc.text(), 'wednesday at 02:00', here + 'fmt')
  t.end()
})
