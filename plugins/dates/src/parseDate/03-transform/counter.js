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

// const oneBased = {
//   minute: true,
// }

const applyCounter = function (unit, counter = {}) {
  let Unit = units[counter.unit]
  let num = counter.num
  if (!num || !Unit) {
    return unit
  }
  let d = unit.d
  console.log(unit)

  // support 'nth week', eg.
  if (typeof num === 'number') {
    d = d.add(num, counter.unit)
  }

  let u = new Unit(d, null, unit.context)
  if (u.d.isValid() === true) {
    return u
  }
  return unit //fallback
}
module.exports = applyCounter
