const units = require('../_units')
const mapping = {
  week: units.Week,
  month: units.Month,
  quarter: units.Quarter,
  year: units.Year,
  season: units.Season,
}

// when a unit of time is spoken of as 'this month' - instead of 'february'
const namedUnit = function (doc, context) {
  //this month, last quarter, next year
  let m = doc.match('^(weekday|week|month|quarter|season|year)$')
  if (m.found === true) {
    let str = m.lastTerm().text('reduced')
    if (mapping.hasOwnProperty(str)) {
      let Model = mapping[str]
      if (!Model) {
        return null
      }
      let unit = new Model(null, str, context)
      return unit
    }
  }

  //try this version - 'next friday, last thursday'
  m = doc.match('^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$')
  if (m.found === true) {
    let str = m.lastTerm().text('reduced')
    let unit = new units.WeekDay(str, null, context)
    return unit
  }
  return null
}
module.exports = namedUnit
