const fixedHolidays = require('./holidays/fixed')
const astroHolidays = require('./holidays/moving')
const units = require('./units')
const spacetime = require('spacetime')

const parseHoliday = function(doc) {
  let d = null
  let str = doc.match('#Holiday+').out('reduced')
  // holidays that are the same each year
  if (fixedHolidays.hasOwnProperty(str)) {
    let arr = fixedHolidays[str]
    let s = spacetime.now()
    s = s.month(arr[0])
    s = s.date(arr[1])
    d = new units.CalendarDate(s)
  }
  // holidays that move each year
  let astro = astroHolidays['2018']
  if (astro.hasOwnProperty(str)) {
    let arr = astro[str]
    let s = spacetime.now()
    s = s.month(arr[0])
    s = s.date(arr[1])
    d = new units.CalendarDate(s)
  }
  return d
}
module.exports = parseHoliday
