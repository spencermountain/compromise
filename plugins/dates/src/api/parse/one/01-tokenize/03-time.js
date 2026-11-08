import spacetime from 'spacetime'
import { knownTimes as hardCoded } from '../_lib.js'

const minMap = {
  quarter: 15,
  half: 30,
}

// choose ambiguous ampm
const ampmChooser = function (s) {
  const early = s.time('6:00am')
  if (s.isBefore(early)) {
    return s.ampm('pm')
  }
  return s
}

// '25:00', '2:62pm', '13pm' - spacetime would clamp these, so reject them
const isImpossible = function (str) {
  const m = str.match(/^([0-9]{1,2})(?::([0-9]{2}))?(?::([0-9]{2}))? ?(am|pm)?$/)
  if (!m) {
    return false
  }
  const [hour, min, sec] = m.slice(1, 4).map(n => Number(n || 0))
  if (m[4] && (hour < 1 || hour > 12)) {
    return true
  }
  return hour > 23 || min > 59 || sec > 59
}

// '00:30' or '16:05' are already unambiguous
const is24Hour = str => /^(0[0-9]|1[3-9]|2[0-3]):/.test(str)

// keep seconds, when given
const toTime = function (s) {
  if (s.second() === 0) {
    return s.time()
  }
  return s.format('{hour-24-pad}:{minute-pad}:{second-pad}')
}

// parse 'twenty past 2'
const halfPast = function (m, s) {
  let hour = m.match('#Cardinal$')
  const punt = m.not(hour).match('(half|quarter|25|20|15|10|5)')
  // get the mins, and the hour
  hour = hour.text('reduced')
  let mins = punt.text('reduced')
  // support 'quarter'
  if (Object.hasOwn(minMap, mins)) {
    mins = minMap[mins]
  }
  const behind = m.has('to')
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
  // '12 noon' - but not 'june 12 noon'
  if (time.has('^(noon|midnight)$') && doc.has('12 (noon|midnight)') && !doc.has('(#Month|the) 12')) {
    time = doc.match('12 (noon|midnight)')
  }
  time = time.not('sharp')
  time = time.not('on the dot')

  let s = spacetime(context.today || null, context.timezone)
  // sentinel-millisecond, so a no-op parse won't equal `now` below
  s = s.millisecond(123)
  const now = s.clone()
  // check for known-times (like 'today')
  let timeStr = time.not('in? the').text('reduced')
  timeStr = timeStr.replace(/^@/, '')//@4pm
  timeStr = timeStr.replace(/^12 (noon|midnight)$/, '$1')
  if (Object.hasOwn(hardCoded, timeStr)) {
    return { result: hardCoded[timeStr], m: time }
  }
  if (isImpossible(timeStr)) {
    return { result: null, m: time, invalid: true }
  }
  // '5 oclock'
  let m = time.match("^#Cardinal (oclock|o'clock) (am|pm)?")
  if (m.found) {
    s = s.hour(m.match('#Cardinal').text('reduced'))
    s = s.startOf('hour')
    if (s.isValid() && !s.isEqual(now)) {
      const ampm = m.match('(am|pm)')
      // 'four o'clock this afternoon'
      const desc = time.match('(morning|afternoon|evening|night)')
      if (ampm.found) {
        s = s.ampm(ampm.text('reduced'))
      } else if (desc.found) {
        s = s.ampm(desc.has('morning') ? 'am' : 'pm')
        m = m.concat(desc)
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
    if (Object.hasOwn(minMap, min)) {
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
    if (Object.hasOwn(minMap, min)) {
      min = minMap[min]
    }
    d = d.next('hour').startOf('hour').minus(min, 'minutes')
    if (d.isValid() && !d.isEqual(now)) {
      return { result: d.time(), m }
    }
  }
  // '4 in the evening'
  m = time.match('[<time>#Time] (in|at) the? [<desc>(morning|afternoon|evening|night|nighttime)]')
  if (m.found) {
    const str = m.groups('time').text('normal')
    if (/^[0-9]{1,2}$/.test(str)) {
      s = s.hour(str) //3 in the morning
      s = s.startOf('hour')
    } else {
      s = s.time(str) // 3:30 in the morning
    }
    if (s.isValid() && !s.isEqual(now)) {
      const desc = m.groups('desc').text('reduced')
      if (desc === 'afternoon' || desc === 'evening' || desc === 'night') {
        s = s.ampm('pm')
      }
      return { result: s.time(), m }
    }
  }

  // 'this morning at 4'
  m = time.match('this? [<desc>(morning|evening|tonight)] at [<time>(#Cardinal|#Time)]')
  if (m.found) {
    const g = m.groups()
    const str = g.time.text('reduced')
    if (/^[0-9]{1,2}$/.test(str)) {
      s = s.hour(str) //3
      s = s.startOf('hour')
    } else {
      s = s.time(str) // 3:30
    }
    if (s.isValid() && !s.isEqual(now)) {
      const desc = g.desc.text('reduced')
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
    const str = m.text('reduced')
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
  // support seperated number times like '10 30 pm'
  m = time.match('#Time+ (am|pm)?').match('[<hour>#Cardinal] [<minute>#Cardinal] [<ampm>(am|pm)]?')
  if (m.found) {
    const hour = m.groups('hour')
    const minute = m.groups('minute')
    const hourNum = hour.numbers().get()[0]
    const minuteNum = minute.numbers().get()[0]
    if (hourNum < 24 && minuteNum < 60) {
      s = s.hour(hour.text('reduced'))
      s = s.minute(minute.text('reduced'))
      if (m.groups('ampm').found) {
        s = s.ampm(m.groups('ampm').text('reduced'))
      } else {
        s = ampmChooser(s)
      }
      return { result: s.time(), m }
    }
    // fall-through to the generic parser, below
  }

  // parse random a time like '4:54pm'
  const str = time.text('reduced')
  s = s.time(str)
  if (s.isValid() && !s.isEqual(now)) {
    // choose ambiguous ampm
    if (/(am|pm)/i.test(str) === false && !is24Hour(str)) {
      s = ampmChooser(s)
    }
    return { result: toTime(s), m: time }
  }
  // should we fallback to a dayStart default?
  if (context.dayStart) {
    return { result: context.dayStart, m: doc.none() }
  }
  return { result: null, m: doc.none() }
}
export default parseTime
