const units = require('./units')
const spacetimeHoliday = require('spacetime-holiday')

const parseHoliday = function(doc) {
  let d = null
  let str = doc.match('#Holiday+').out('reduced')
  let year = 2020 //change me!
  let s = spacetimeHoliday(str, year)
  if (s !== null) {
    d = new units.CalendarDate(s)
  }
  return d
}
module.exports = parseHoliday
