const spacetime = require('spacetime')
const parseRanges = require('./02-ranges')
const normalize = require('./normalize')
const maxDate = 8640000000000000

// generate possible dates for a repeating date
const generateDates = function (result, context) {
  let max_count = context.max_repeat || 12
  let list = []
  // console.log(result.start.d)
  let s = spacetime(result.start.d || context.today, context.timezone)
  // let end = spacetime(result.end || maxDate, context.timezone)
  let toAdd = Object.keys(result.repeat.interval)
  // start going!
  let days = result.repeat.filter.weekDays
  while (list.length < max_count) {
    if (days) {
      if (days[s.dayName()] === true) {
        list.push(s.iso())
      }
    } else {
      list.push(s.iso())
    }
    toAdd.forEach((unit) => {
      s = s.add(result.repeat.interval[unit], unit)
    })
  }
  result.repeat.generated = list
  return result
}

const getDate = function (doc, context) {
  // validate context a bit
  context = context || {}
  context.timezone = context.timezone || 'ETC/UTC'
  context.today = spacetime(context.today || null, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)
  //interpret 'between [A] and [B]'...
  let result = parseRanges(doc, context)
  if (result.repeat) {
    result = generateDates(result, context)
  }
  return result
}
module.exports = getDate
