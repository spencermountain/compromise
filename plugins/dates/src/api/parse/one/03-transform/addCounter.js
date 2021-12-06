import { Quarter, Season, Week, Day, Hour, Minute, Month, WeekEnd } from '../units/index.js'

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
    if (counter.unit === 'weekend') {
      d = d.day('saturday', false)
    } else {
      d = d.startOf(counter.unit)
    }
  } else if (counter.num) {
    if (counter.unit === 'weekend') {
      d = d.day('saturday', true).add(1, 'day') //fix bug
    }
    // support 'nth week', eg.
    d = d.add(counter.num, counter.unit)
  }
  let u = new Unit(d, null, unit.context)
  if (u.d.isValid() === true) {
    return u
  }
  return unit //fallback
}
export default applyCounter
