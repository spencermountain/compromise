const spacetime = require('spacetime')

const hardCoded = {
  daybreak: '7:00am', //ergh
  breakfast: '8:00am',
  morning: '9:00am',
  noon: '12:00pm',
  afternoon: '2:00pm',
  lunchtime: '12:00pm',
  evening: '6:00pm',
  dinnertime: '6:00pm',
  night: '8:00pm',
  midnight: '12:00am',
}

const halfPast = function (m, s) {
  let hour = m.match('#Cardinal$').text('reduced')

  let term = m.match('(half|quarter|25|15|10|5)')
  let mins = term.text('reduced')
  if (term.has('half')) {
    mins = '30'
  }
  if (term.has('quarter')) {
    mins = '15'
  }
  let behind = m.has('to')
  // apply it
  s = s.hour(hour)
  s = s.startOf('hour')
  if (behind) {
    s = s.subtract(mins, 'minutes')
  } else {
    s = s.add(mins, 'minutes')
  }
  return s
}

const parseTime = function (doc, context) {
  let time = doc.match('(at|by|for|before)? #Time+')
  if (time.found) {
    doc.remove(time)
  }
  // get the main part of the time
  time = time.not('(at|by|for|before|sharp)')
  time = time.not('on the dot')
  let s = spacetime.now(context.timezone)
  let now = s.clone()

  // check for known-times (like 'today')
  let timeStr = time.text('reduced')
  if (hardCoded.hasOwnProperty(timeStr)) {
    return hardCoded[timeStr]
  }

  // '5 oclock'
  let m = time.match('^#Cardinal oclock (am|pm)?')
  if (m.found) {
    m = m.not('oclock')
    s = s.hour(m.text('reduced'))
    if (s.isValid() && !s.isEqual(now)) {
      return s.time()
    }
  }

  // 'quarter to two'
  m = time.match('(half|quarter|25|15|10|5) (past|after|to) #Cardinal')
  if (m.found) {
    s = halfPast(m, s)
    if (s.isValid() && !s.isEqual(now)) {
      return s.time()
    }
  }
  // parse random a time like '4:54pm'
  let str = time.text('reduced')
  s = s.time(str)
  if (s.isValid() && !s.isEqual(now)) {
    return s.time()
  }
  return null
}
module.exports = parseTime
