import parseTime from '../../one/01-tokenize/03-time.js'

const dayNames = {
  mon: 'monday',
  tue: 'tuesday',
  tues: 'wednesday',
  wed: 'wednesday',
  thu: 'thursday',
  fri: 'friday',
  sat: 'saturday',
  sun: 'sunday',
  monday: 'monday',
  tuesday: 'tuesday',
  wednesday: 'wednesday',
  thursday: 'thursday',
  friday: 'friday',
  saturday: 'saturday',
  sunday: 'sunday',
}
// 'any tuesday' vs 'every tuesday'
const parseLogic = function (m) {
  if (m.match('(every|each)').found) {
    return 'AND'
  }
  if (m.match('(any|a)').found) {
    return 'OR'
  }
  return null
}

// parse repeating dates, like 'every week'
const parseIntervals = function (doc, context) {
  // 'every week'
  let m = doc.match('[<logic>(every|any|each)] [<skip>other?] [<unit>#Duration] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { interval: {} }
    let unit = m.groups('unit').text('reduced')
    repeat.interval[unit] = 1
    repeat.choose = parseLogic(m)
    // 'every other week'
    if (m.groups('skip').found) {
      repeat.interval[unit] = 2
    }
    doc = doc.remove(m)
    return { repeat: repeat }
  }

  // 'every two weeks'
  m = doc.match('[<logic>(every|any|each)] [<num>#Value] [<unit>#Duration] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { interval: {} }
    let units = m.groups('unit')
    units.nouns().toSingular()
    let unit = units.text('reduced')
    repeat.interval[unit] = m.groups('num').numbers().get()[0]
    repeat.choose = parseLogic(m)
    doc = doc.remove(m)
    return { repeat: repeat }
  }

  // 'every friday'
  m = doc.match('[<logic>(every|any|each|a)] [<skip>other?] [<day>#WeekDay+] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { interval: { day: 1 }, filter: { weekDays: {} } }
    let str = m.groups('day').text('reduced')
    str = dayNames[str] //normalize it
    if (str) {
      repeat.filter.weekDays[str] = true
      repeat.choose = parseLogic(m)
      doc = doc.remove(m)
      return { repeat: repeat }
    }
  }

  // 'every weekday'
  m = doc.match(
    '[<logic>(every|any|each|a)] [<day>(weekday|week day|weekend|weekend day)] (starting|beginning|commencing)?'
  )
  if (m.found) {
    let repeat = { interval: { day: 1 }, filter: { weekDays: {} } }
    let day = m.groups('day')
    if (day.has('(weekday|week day)')) {
      repeat.filter.weekDays = {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
      }
    } else if (day.has('(weekend|weekend day)')) {
      repeat.filter.weekDays = {
        saturday: true,
        sunday: true,
      }
    }
    repeat.choose = parseLogic(m)
    doc = doc.remove(m)
    return { repeat: repeat }
  }

  // mondays
  m = doc.match(
    '[<day>(mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays)] (at|near|after)? [<time>#Time+?]'
  )
  if (m.found) {
    let repeat = { interval: { day: 1 }, filter: { weekDays: {} } }
    let str = m.groups('day').text('reduced')
    str = str.replace(/s$/, '')
    str = dayNames[str] //normalize it
    if (str) {
      repeat.filter.weekDays[str] = true
      repeat.choose = 'OR'
      doc = doc.remove(m)
      let time = m.groups('time')
      if (time.found) {
        repeat.time = parseTime(time, context)
      }
      return { repeat: repeat }
    }
  }
  return null
}
export default parseIntervals
