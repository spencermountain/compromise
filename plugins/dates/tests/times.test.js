import test from 'tape'
import spacetime from 'spacetime'
import nlp from './_lib.js'
const here = ' [dates/times] '

test('times of start and end', function (t) {
  const context = {
    timezone: 'Asia/Shanghai',
    today: '2018-01-19T10:05:00',
  }
  const arr = [
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
['monday at 3', '3:00pm'],
    ['monday at 3pm', '3:00pm'],
    ['monday at 3:30', '3:30pm'],
    ['monday at 3:30pm', '3:30pm'],
    ['monday at 9am', '9:00am'],
    ['monday at 9', '9:00am'],
    ['friday at 5', '5:00pm'],
    ['friday at 5pm', '5:00pm'],
    ['thursday at noon', '12:00pm'],
    ['thursday at midnight', '12:00am'],
    ['today at 4', '4:00pm'],
    ['today at 4pm', '4:00pm'],
    ['tomorrow at 3', '3:00pm'],
    ['tomorrow at 3pm', '3:00pm'],
    ['yesterday at 2pm', '2:00pm'],
    ['5:00 today', '5:00pm'],
    ['5:30 in the morning', '5:30am'],
    ['5 in the morning', '5:00am'],
    ['5:30 in the afternoon', '5:30pm'],
    ['6 in the evening', '6:00pm'],
    ['7 at night', '7:00pm'],
    ['noon today', '12:00pm'],
    ['half past 4', '4:30pm'],
    ['quarter past 3', '3:15pm'],
    ['twenty past 2', '2:20pm'],
    ['2 oclock pm', '2:00pm'],
    ['2 oclock am', '2:00am'],
    ['10 oclock', '10:00am'],
    ['10 oclock pm', '10:00pm'],
    ['between 9am and 12pm', '9:00am', '12:00pm'],
    ['between 2pm and 4pm', '2:00pm', '4:00pm'],
    ['between 2 and 4 tomorrow', '2:00pm', '4:00pm'],
    ['between 3 and 6 monday', '3:00pm', '6:00pm'],
    ['monday between 1 and 3pm', '1:00pm', '3:00pm'],
    ['from 9am to 5pm', '9:00am', '5:00pm'],
    ['from 2 to 4pm', '2:00pm', '4:00pm'],
    ['monday from 9 to 5', '9:00am', '5:00pm'],
    ['monday from 9am to 5pm', '9:00am', '5:00pm'],
    ['monday from 2 to 4pm', '2:00pm', '4:00pm'],
    ['9 to 5 monday', '9:00am', '5:00pm'],
    ['9-5 monday', '9:00am', '5:00pm'],
    ['9am-5pm monday', '9:00am', '5:00pm'],
    ['mon 9 to 5', '9:00am', '5:00pm'],
    ['mon from 9-5', '9:00am', '5:00pm'],
    ['4pm to 6pm', '4:00pm', '6:00pm'],
    ['4-6pm', '4:00pm', '6:00pm'],
    ['4pm-6pm', '4:00pm', '6:00pm'],
    ['3-4pm', '3:00pm', '4:00pm'],
    ['11am to 1pm', '11:00am', '1:00pm'],
    ['11-1pm', '11:00am', '1:00pm'],
    ['4pm to 5pm today', '4:00pm', '5:00pm'],
    ['4 to 5 tomorrow', '4:00pm', '5:00pm'],
    ['between 4pm and 5pm tomorrow', '4:00pm', '5:00pm'],
    ['friday from 3 to 5pm', '3:00pm', '5:00pm'],
    ['fri from 3-5', '3:00pm', '5:00pm'],
    ['thurs at 2pm to 4pm', '2:00pm', '4:00pm'],
    ['wed between 1 and 3', '1:00pm', '3:00pm'],
    ['wed between 1 - 3pm', '1:00pm', '3:00pm'],
    ['march 5 from 2-4pm', '2:00pm', '4:00pm'],
    ['march 5th 2pm to 4pm', '2:00pm', '4:00pm'],
    ['2pm to 4pm on march 5', '2:00pm', '4:00pm'],
    ['march 9 at 2pm - 5pm', '2:00pm', '5:00pm'],
    ['january 5 from 11 to 1', '11:00am', '1:00pm'],
    ['january 5th 11am to 1pm', '11:00am', '1:00pm'],
    ['anytime after 5', '5:00pm'],
    ['anytime after 5pm', '5:00pm'],
    ['anytime after noon', '12:00pm'],
    ['sometime after 3pm', '3:00pm'],
    ['after 4pm', '4:00pm'],
    ['in 2 hours', '12:05pm'],
    ['in two hours', '12:05pm'],
    ['in 30 minutes', '10:35am'],
    ['next tuesday at 4', '4:00pm'],
    ['next wednesday at 3pm', '3:00pm'],
    ['this friday at 2pm', '2:00pm'],
    ['@3:15', '3:15pm'],
    ['@15:30', '3:30pm'],
    ['@2:30', '2:30pm'],
    ['@14:00', '2:00pm'],
    ['8am to 4:30pm', '8:00am', '4:30pm'],
    ['7:30am to 3:45pm', '7:30am', '3:45pm'],
    ['between 8am and 4:30pm', '8:00am', '4:30pm'],
    ['4pm or 6pm', '4:00pm'],
    ['dinnertime', '6:00pm'],
    ['lunchtime', '12:00pm'],
    ['at 2pm', '2:00pm'],
    ['at 2:30', '2:30pm'],
    ['at 2:30pm', '2:30pm'],
    ['around 3pm', '3:00pm'],
    ['around 3:30', '3:30pm'],
    ['1pm to 3pm', '1:00pm', '3:00pm'],
    ['1-3pm', '1:00pm', '3:00pm'],
    ['2:15pm to 4:45pm', '2:15pm', '4:45pm'],
    ['9:05am to 5:55pm', '9:05am', '5:55pm'],
    ['3-5 on march 2', '3:00pm', '5:00pm'],
    ['february 1 from 9am-12pm', '9:00am', '12:00pm'],
    ['between 10 and 2 tuesday', '10:00am', '2:00pm'],
    ['tuesday between 10am and 2pm', '10:00am', '2:00pm'],
    ['from 10 to 2 on tuesday', '10:00am', '2:00pm'],
    ['friday from 4pm to 6', '4:00pm', '6:00pm'],
    ['at 10 past 3', '3:10pm'],
    ['at twenty past 4', '4:20pm'],
    ['half past noon', '12:00pm'],
    ['14:00', '2:00pm'],
    ['14:30', '2:30pm'],
    ['4pm est', '4:00pm'],
    ['4pm eastern', '4:00pm'],
    ['3pm pst', '3:00pm'],
    ['sharp at 4pm', '4:00pm'],
    ['4pm sharp', '4:00pm'],
    ['4pm on the dot', '4:00pm'],
    ['on the dot at 4pm', '4:00pm'],
    ['tonight at 8', '8:00pm'],
    ['tonight at 8pm', '8:00pm'],
    ['8pm tonight', '8:00pm'],
    ['at noon', '12:00pm'],
    ['at midnight', '12:00am'],
    ['around noon', '12:00pm'],
    ['around 4pm', '4:00pm'],
    ['sat at 3pm', '3:00pm'],
    ['this morning at 9', '9:00am'],
    ['wednesday from 2pm', '2:00pm'],
    ['saturday from 10 to 12', '10:00am', '12:00pm'],
    ['tuesday from 10 to 12', '10:00am', '12:00pm'],
    ['2:30pm today', '2:30pm'],
    ['2:30 today', '2:30pm'],
  ]
  arr.forEach((a) => {
    const doc = nlp(a[0])
    const dates = doc.dates(context).get()[0] || {}
    const start = spacetime(dates.start)
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
  t.end()
})

test('times test', function (t) {
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
  t.end()
})
