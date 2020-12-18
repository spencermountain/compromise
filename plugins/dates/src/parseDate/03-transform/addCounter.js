const { Quarter, Season, Week, Day, Hour, Minute, Month, WeekEnd } = require('../units')

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

const applyCounter = function (unit, counter = {}) {
  let Unit = units[counter.unit]
  if (!Unit) {
    return unit
  }
  let d = unit.d

  // support 'first' or 0th
  if (counter.dir === 'first' || counter.num === 0) {
    d = unit.start().d
    d = d.startOf(counter.unit)
  } else if (counter.dir === 'last') {
    d = d.endOf(unit.unit)
    d = d.startOf(counter.unit)
  } else if (counter.num) {
    // support 'nth week', eg.
    d = d.add(counter.num, counter.unit)
  }
  let u = new Unit(d, null, unit.context)
  if (u.d.isValid() === true) {
    return u
  }
  return unit //fallback
}
module.exports = applyCounter
