const spacetime = require('spacetime')

const hardCoded = {
  daybreak: '7:00am', //ergh
  breakfast: '8:00am',
  morning: '9:00am',
  noon: '12:00pm',
  midday: '12:00pm',
  afternoon: '2:00pm',
  lunchtime: '12:00pm',
  evening: '6:00pm',
  dinnertime: '6:00pm',
  night: '8:00pm',
  eod: '10:00pm',
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
  // assume 'half past 5' is 5pm
  if (hour < 6) {
    s = s.ampm('pm')
  }
  if (behind) {
    s = s.subtract(mins, 'minutes')
  } else {
    s = s.add(mins, 'minutes')
  }
  return s
}

const parseTime = function (doc, context) {
  let time = doc.match('(at|by|for|before|this)? #Time+')
  if (time.found) {
    doc.remove(time)
  }
  // get the main part of the time
  time = time.not('^(at|by|for|before|this)')
  time = time.not('sharp')
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
    s = s.startOf('hour')
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
  // '4 in the evening'
  m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|evening|night|nighttime)]')
  if (m.found) {
    let str = m.groups('time').text('reduced')
    if (/^[0-9]{1,2}$/.test(str)) {
      s = s.hour(str) //3 in the morning
    } else {
      s = s.time(str) // 3:30 in the morning
    }
    if (s.isValid() && !s.isEqual(now)) {
      let desc = m.groups('desc').text('reduced')
      if (desc === 'evening' || desc === 'night') {
        s = s.ampm('pm')
      }
      return s.time()
    }
  }

  // 'this morning at 4'
  m = time.match('this? [<desc>(morning|evening|tonight)] at [<time>(#Cardinal|#Time)]')
  if (m.found) {
    let g = m.groups()
    let str = g.time.text('reduced')
    if (/^[0-9]{1,2}$/.test(str)) {
      s = s.hour(str) //3
      s = s.startOf('hour')
    } else {
      s = s.time(str) // 3:30
    }
    if (s.isValid() && !s.isEqual(now)) {
      let desc = g.desc.text('reduced')
      if (desc === 'morning') {
        s = s.ampm('am')
      }
      if (desc === 'evening' || desc === 'tonight') {
        s = s.ampm('pm')
      }
      return s.time()
    }
  }

  // 'at 4' -> '4'
  m = time.match('^#Cardinal$')
  if (m.found) {
    s = s.hour(m.text('reduced'))
    s = s.startOf('hour')
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
