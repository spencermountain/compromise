const getDuration = require('./duration')
const spacetime = require('spacetime')

const mapUnits = {
  millisecond: 'time',
  hour: 'time',
  minute: 'time',
}

// try to decide what 'thing' this date-range is
const getUnit = function (date) {
  if (date.unit) {
    if (mapUnits.hasOwnProperty(date.unit)) {
      return mapUnits[date.unit]
    }
    return date.unit
  }
  let duration = date.duration
  if (!duration) {
    duration = getDuration(date)
  }
  let start = spacetime(date.start)
  let end = spacetime(date.end)
  // 2021-2022
  if (duration.years) {
    if (start.isSame('year', end)) {
      return 'year'
    }
    return 'years'
  }
  // june-july
  if (duration.months) {
    if (start.isSame('month', end)) {
      return 'month'
    }
    return 'months'
  }
  // june 4-19th
  if (duration.days) {
    return 'days'
  }
  // just a matter of hours
  if (start.isSame('day', end)) {
    return 'time'
  }
  return null
}
module.exports = getUnit
