const spacetime = require('spacetime')
const maxDate = 8640000000000000
const max_loops = 500

const shouldPick = function (s, byDay) {
  if (byDay && byDay[s.dayName()] !== true) {
    return false
  }
  return true
}

// list possible dates of a repeating date
const generateDates = function (result, context) {
  let list = []
  let max_count = context.max_repeat || 12
  let s = spacetime(result.start || context.today, context.timezone)
  s = s.startOf('day')
  if (context.dayStart) {
    s = s.time(context.dayStart)
  }
  // should we stop at the end date?
  let end = spacetime(result.end, context.timezone)
  let toAdd = Object.keys(result.repeat.interval)
  if (toAdd[0] && s.isSame(end, toAdd[0]) === true) {
    // ignore the end date!
    end = spacetime(maxDate, context.timezone)
  }
  // should we only include these days?
  let byDay = null
  if (result.repeat.filter) {
    byDay = result.repeat.filter.weekDays
  }
  // start going!
  let loops = 0
  // TODO: learn how to write better software.
  for (let i = 0; i < max_loops; i += 1) {
    if (list.length >= max_count || s.epoch >= end.epoch) {
      break
    }
    if (shouldPick(s, byDay, end)) {
      list.push(s.iso())
    }
    toAdd.forEach((unit) => {
      s = s.add(result.repeat.interval[unit], unit)
    })
    loops += 1
    if (loops > 10000) {
      console.warn('Warning: Possible infinite loop in date-parser')
      console.log(result.repeat)
      break
    }
  }
  result.repeat.generated = list
  // if we got an interval, but not a start/end
  if (!result.start && result.repeat.generated && result.repeat.generated.length > 1) {
    let arr = result.repeat.generated
    result.start = arr[0]
    result.end = arr[arr.length - 1]
  }
  return result
}
module.exports = generateDates
