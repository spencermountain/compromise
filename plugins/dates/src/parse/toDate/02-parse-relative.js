const units = {
  // week: require('./units/Week'),
  // month: require('./units/Month'),
  // season: require('./units/Season'),
  // quarter: require('./units/Quarter'),
  // year: require('./units/Year')
}
// const Weekday = require('./units/Weekday')

// when a unit of time is spoken of as 'this month' - instead of 'february'
const findRelativeUnit = function(doc, context) {
  //this month, last quarter, next year
  let m = doc.match(
    'this? (next|last|previous|current|this) (weekday|week|month|quarter|season|year)'
  )
  if (m.found === true) {
    let str = m.lastTerm().out('normal')
    if (units.hasOwnProperty(str)) {
      let unit = new units[str](null, context)
      //handle next/last logic
      if (m.has('next') === true) {
        return unit.nextOne()
      } else if (m.has('(last|previous)') === true) {
        return unit.lastOne()
      }
      return unit
    }
  }

  //try this version - 'next friday, last thursday'
  m = doc.match(
    'this? (next|last|previous|current|this) (monday|tuesday|wednesday|thursday|friday|saturday|sunday)'
  )
  if (m.found === true) {
    let str = m.lastTerm().out('normal')
    let unit = new Weekday(str, context)
    if (m.has('next') === true) {
      return unit.nextOne()
    } else if (m.has('(last|previous)') === true) {
      return unit.lastOne()
    }
    return unit
  }
  return null
}
module.exports = findRelativeUnit
