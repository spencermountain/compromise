const { CalendarDate } = require('../units')
const spacetimeHoliday = require('spacetime-holiday')

const parseHoliday = function (doc, context) {
  let unit = null
  let str = doc.match('#Holiday+').text('reduced')
  let year = context.today.year()
  let s = spacetimeHoliday(str, year)
  if (s !== null) {
    unit = new CalendarDate(s, null, context)
  }
  return unit
}
module.exports = parseHoliday
