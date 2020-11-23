const { Quarter, Season, Week, Day, Hour, CalendarDate, Month, WeekEnd } = require('../_units')
const spacetime = require('spacetime')

const units = {
  day: Day,
  week: Week,
  weekend: WeekEnd,
  month: Month,
  quarter: Quarter,
  season: Season,
  hour: Hour,
}

const parseDates = function (doc, context) {
  // 'first week of 2019'
  let m = doc.match('[<num>(#Value|first|initial)] [<unit>#DateUnit+] (of|in) [<year>#Year]')
  if (m.found) {
    let s = spacetime(null, context.timezone, { today: context.today })
    let year = m.groups('year').text('reduced')
    let unit = m.groups('unit').text('reduced')
    if (units.hasOwnProperty(unit)) {
      s = s.year(year)
      s = s.startOf('year')
      s = s.startOf(unit)
      let d = new units[unit](s, null, context)
      if (d.d.isValid() === true) {
        return d
      }
    }
  }
  // 'last week of 2019'
  m = doc.match('(last|final) [<unit>#DateUnit+] (of|in) [<year>#Year]')
  if (m.found) {
    let s = spacetime(null, context.timezone, { today: context.today })
    let year = m.groups('year').text('reduced')
    let unit = m.groups('unit').text('reduced')
    if (units.hasOwnProperty(unit)) {
      s = s.year(year)
      s = s.endOf('year')
      s = s.startOf(unit)
      let d = new units[unit](s, null, context)
      if (d.d.isValid() === true) {
        return d
      }
    }
  }

  return null
}
module.exports = parseDates
