const { Quarter, Season, Week, Day, Hour, CalendarDate, Minute, Month, WeekEnd } = require('../units/_units')
const spacetime = require('spacetime')

const units = {
  day: Day,
  week: Week,
  weekend: WeekEnd,
  month: Month,
  quarter: Quarter,
  season: Season,
  hour: Hour,
  minute: Minute,
}

const oneBased = {
  minute: true,
}

const parseDates = function (doc, context) {
  // 'first week of 2019'
  let m = doc.match('(first|initial) [<unit>#Duration+] (of|in) [<year>#Year]')
  if (m.found) {
    let s = spacetime(null, context.timezone, { today: context.today })
    let year = m.groups('year').text('reduced')
    let unit = m.groups('unit').text('reduced')
    if (units.hasOwnProperty(unit)) {
      s = s.year(year)
      s = s.startOf('year')
      s = s.startOf(unit)
      let u = new units[unit](s, null, context)
      if (u.d.isValid() === true) {
        return u
      }
    }
  }
  // 'last week of 2019'
  m = doc.match('(last|final) [<unit>#Duration+] (of|in) [<year>#Year]')
  if (m.found) {
    let s = spacetime(null, context.timezone, { today: context.today })
    let year = m.groups('year').text('reduced')
    let unit = m.groups('unit').text('reduced')
    if (units.hasOwnProperty(unit)) {
      s = s.year(year)
      s = s.endOf('year')
      s = s.startOf(unit)
      let u = new units[unit](s, null, context)
      if (u.d.isValid() === true) {
        return u
      }
    }
  }

  // 'nth week of 2019'
  m = doc.match('[<num>#Value] [<unit>#Duration+] (of|in) [<year>#Year]')
  if (m.found) {
    let s = spacetime(null, context.timezone, { today: context.today })
    let year = m.groups('year').text('reduced')
    let unit = m.groups('unit').text('reduced')
    if (units.hasOwnProperty(unit)) {
      let num = m.groups('num').text('reduced')
      s = s.year(year)
      s = s.startOf('year')
      num = Number(num) - 1
      if (oneBased[unit] === true) {
        num += 1
      }
      s = s.add(num, unit)
      let u = new units[unit](s, null, context)
      if (u.d.isValid() === true) {
        return u
      }
    }
  }
  return null
}
module.exports = parseDates
