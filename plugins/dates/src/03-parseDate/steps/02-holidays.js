const { CalendarDate } = require('../_units')
const spacetimeHoliday = require('spacetime-holiday')

const parseHoliday = function(doc, context) {
  let d = null
  let str = doc.match('#Holiday+').text('reduced')
  let year = 2020 //change me!
  let s = spacetimeHoliday(str, year)
  if (s !== null) {
    d = new CalendarDate(s, null, context)
  }
  return d
}
module.exports = parseHoliday
