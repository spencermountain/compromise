const dayNames = {
  mon: 'monday',
  tue: 'tuesday',
  tues: 'wednesday',
  wed: 'wednesday',
  thu: 'thursday',
  fri: 'friday',
  sat: 'saturday',
  sun: 'sunday',
}
// 'any tuesday' vs 'every tuesday'
const parseLogic = function (m) {
  if (m.match('(every|each)').found) {
    return 'AND'
  }
  if (m.match('any)').found) {
    return 'OR'
  }
  return null
}

// parse repeating dates, like 'every week'
const parseIntervals = function (doc, context) {
  // 'every week'
  let m = doc.match('[<logic>(every|any|each)] [<skip>other?] [<unit>#Duration] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { duration: {} }
    let unit = m.groups('unit').text('reduced')
    repeat.duration[unit] = 1
    repeat.choose = parseLogic(m)
    // 'every other week'
    if (m.groups('skip').found) {
      repeat.duration[unit] = 2
    }
    doc = doc.remove(m)
    return { repeat: repeat }
  }
  // 'every two weeks'
  m = doc.match('[<logic>(every|any|each)] [<num>#Value] [<unit>#Duration] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { duration: {} }
    let units = m.groups('unit')
    units.nouns().toSingular()
    let unit = units.text('reduced')
    repeat.duration[unit] = m.groups('num').numbers().get(0)
    repeat.choose = parseLogic(m)
    doc = doc.remove(m)
    return { repeat: repeat }
  }
  // 'every friday'
  m = doc.match('[<logic>(every|any|each)] [<skip>other?] [<day>#WeekDay] (starting|beginning|commencing)?')
  if (m.found) {
    let repeat = { duration: { day: 1 }, filter: { weekDays: {} } }
    let str = m.groups('day').text('reduced')
    if (dayNames.hasOwnProperty(str)) {
      str = dayNames[str]
    }
    repeat.filter.weekDays[str] = true
    repeat.choose = parseLogic(m)
    doc = doc.remove(m)
    return { repeat: repeat }
  }
  return null
}
module.exports = parseIntervals
