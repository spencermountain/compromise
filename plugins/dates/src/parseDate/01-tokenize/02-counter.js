/*
a 'counter' is a Unit determined after a point
  * first hour of x
  * 7th week in x
  * last year in x
  * 
unlike a shift, like "2 weeks after x"
*/
// const { Quarter, Season, Week, Day, Hour, CalendarDate, Minute, Month, WeekEnd } = require('../_units')

// const units = {
//   day: Day,
//   week: Week,
//   weekend: WeekEnd,
//   month: Month,
//   quarter: Quarter,
//   season: Season,
//   hour: Hour,
//   minute: Minute,
// }

// const oneBased = {
//   minute: true,
// }
const getCounter = function (doc) {
  let m = doc.match('[<num>(#Value|first|initial|last|final)] [<unit>#Duration+] (of|in)')
  if (m.found) {
    let obj = m.groups()
    let num = obj.num.text('reduced')
    let unit = obj.unit.text('reduced')
    let found = {
      unit: unit,
      num: Number(num) || num,
    }
    doc = doc.remove(m)
    return found
  }
  return {}
}
module.exports = getCounter
