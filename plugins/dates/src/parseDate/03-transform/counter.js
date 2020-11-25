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
const applyNthUnit = function (unit, counter = {}) {
  let Unit = units[counter.unit]
  if (!counter.num || !Unit) {
    return
  }
  let s = unit.d
  let u = new Unit(s, null, unit.context)
  console.log(u)
}
module.exports = applyNthUnit
