import { Quarter, Season, Week, Day, Hour, Minute, Month, WeekEnd, WeekDay } from '../units/index.js'

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

// the first saturday on-or-after this date
const firstSaturday = function (d) {
  const start = d
  let sat = d.day('saturday')
  if (sat.isBefore(start)) {
    sat = sat.add(1, 'week')
  }
  return sat
}

// '2nd monday of june'
const nthWeekDay = function (unit, counter) {
  const startD = unit.d.startOf(unit.unit)
  let d = null
  if (counter.dir === 'last') {
    const endD = unit.d.endOf(unit.unit)
    d = endD.day(counter.day)
    if (d.isAfter(endD)) {
      d = d.minus(1, 'week')
    }
  } else {
    // the first such weekday, in the period
    d = startD.day(counter.day)
    if (d.isBefore(startD)) {
      d = d.add(1, 'week')
    }
    d = d.add(counter.num || 0, 'weeks')
  }
  d = d.startOf('day')
  const u = new WeekDay(d, null, unit.context)
  if (u.d.isValid() === true) {
    return u
  }
  return unit //fallback
}

const applyCounter = function (unit, counter = {}) {
  if (counter.unit === 'weekday' && counter.day) {
    return nthWeekDay(unit, counter)
  }
  const Unit = units[counter.unit]
  if (!Unit) {
    return unit
  }
  let d = unit.d
  // support 'first' or 0th
  if (counter.dir === 'first' || counter.num === 0) {
    d = unit.start().d
    if (counter.unit === 'weekend') {
      d = firstSaturday(d)
    } else {
      d = d.startOf(counter.unit)
    }
  } else if (counter.dir === 'last') {
    d = d.endOf(unit.unit)
    if (counter.unit === 'weekend') {
      d = d.day('saturday', false)
    } else {
      d = d.startOf(counter.unit)
    }
  } else if (counter.num) {
    if (counter.unit === 'weekend') {
      // nth weekend - count saturdays
      d = firstSaturday(d.startOf(unit.unit)).add(counter.num, 'weeks')
    } else {
      // support 'nth week', eg.
      d = d.add(counter.num, counter.unit)
    }
  }
  const u = new Unit(d, null, unit.context)
  if (u.d.isValid() === true) {
    return u
  }
  return unit //fallback
}
export default applyCounter
