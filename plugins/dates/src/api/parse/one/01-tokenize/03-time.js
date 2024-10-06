import spacetime from 'spacetime'

// these should be added to model
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
  am: '9:00am', //tomorow am
  pm: '5:00pm',
  'early day': '8:00am',
  'late at night': '11:00pm'
}
const minMap = {
  quarter: 15,
  half: 30,
}

// choose ambiguous ampm
const ampmChooser = function (s) {
  let early = s.time('6:00am')
  if (s.isBefore(early)) {
    return s.ampm('pm')
  }
  return s
}

// parse 'twenty past 2'
const halfPast = function (m, s) {
  let hour = m.match('#Cardinal$')
  let punt = m.not(hour).match('(half|quarter|25|20|15|10|5)')
  // get the mins, and the hour
  hour = hour.text('reduced')
  let mins = punt.text('reduced')
  // support 'quarter'
  if (minMap.hasOwnProperty(mins)) {
    mins = minMap[mins]
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
  let time = doc.match('(at|by|for|before|this|after)? #Time+')
  // get the main part of the time
  time = time.not('^(at|by|for|before|this|after)')
  time = time.not('sharp')
  time = time.not('on the dot')

  let s = spacetime.now(context.timezone)
  let now = s.clone()
  // check for known-times (like 'today')
  let timeStr = time.not('in? the').text('reduced')
  timeStr = timeStr.replace(/^@/, '')//@4pm
  if (hardCoded.hasOwnProperty(timeStr)) {
    return { result: hardCoded[timeStr], m: time }
  }
  // '5 oclock'
  let m = time.match('^#Cardinal oclock (am|pm)?')
  if (m.found) {
    s = s.hour(m.text('reduced'))
    s = s.startOf('hour')
    if (s.isValid() && !s.isEqual(now)) {
      let ampm = m.match('(am|pm)')
      if (ampm.found) {
        s = s.ampm(ampm.text('reduced'))
      } else {
        s = ampmChooser(s)
      }
      return { result: s.time(), m }
    }
  }

  // 'quarter to two'
  m = time.match('(half|quarter|25|20|15|10|5) (past|after|to) #Cardinal')
  if (m.found) {
    s = halfPast(m, s)
    if (s.isValid() && !s.isEqual(now)) {
      // choose ambiguous ampm
      s = ampmChooser(s)
      return { result: s.time(), m }
    }
  }
  // 'twenty past'
  m = time.match('[<min>(half|quarter|25|20|15|10|5)] (past|after)')
  if (m.found) {
    let min = m.groups('min').text('reduced')
    let d = spacetime(context.today)
    // support 'quarter', etc.
    if (minMap.hasOwnProperty(min)) {
      min = minMap[min]
    }
    d = d.next('hour').startOf('hour').minute(min)
    if (d.isValid() && !d.isEqual(now)) {
      return { result: d.time(), m }
    }
  }
  // 'ten to'
  m = time.match('[<min>(half|quarter|25|20|15|10|5)] to')
  if (m.found) {
    let min = m.groups('min').text('reduced')
    let d = spacetime(context.today)
    // support 'quarter', etc.
    if (minMap.hasOwnProperty(min)) {
      min = minMap[min]
    }
    d = d.next('hour').startOf('hour').minus(min, 'minutes')
    if (d.isValid() && !d.isEqual(now)) {
      return { result: d.time(), m }
    }
  }
  // '4 in the evening'
  m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|evening|night|nighttime)]')
  if (m.found) {
    let str = m.groups('time').text('normal')
    if (/^[0-9]{1,2}$/.test(str)) {
      s = s.hour(str) //3 in the morning
      s = s.startOf('hour')
    } else {
      s = s.time(str) // 3:30 in the morning
    }
    if (s.isValid() && !s.isEqual(now)) {
      let desc = m.groups('desc').text('reduced')
      if (desc === 'evening' || desc === 'night') {
        s = s.ampm('pm')
      }
      return { result: s.time(), m }
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
      return { result: s.time(), m }
    }
  }

  // 'at 4' -> '4'
  m = time.match('^#Cardinal$')
  if (m.found) {
    let str = m.text('reduced')
    s = s.hour(str)
    s = s.startOf('hour')
    if (s.isValid() && !s.isEqual(now)) {
      // choose ambiguous ampm
      if (/(am|pm)/i.test(str) === false) {
        s = ampmChooser(s)
      }
      return { result: s.time(), m }
    }
  }

  // parse random a time like '4:54pm'
  let str = time.text('reduced')
  s = s.time(str)
  if (s.isValid() && !s.isEqual(now)) {
    // choose ambiguous ampm
    if (/(am|pm)/i.test(str) === false) {
      s = ampmChooser(s)
    }
    return { result: s.time(), m: time }
  }
  // should we fallback to a dayStart default?
  if (context.dayStart) {
    return { result: context.dayStart, m: doc.none() }
  }
  return { result: null, m: doc.none() }
}
export default parseTime
