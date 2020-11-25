const units = require('../units')
const mapping = {
  week: units.Week,
  weekend: units.WeekEnd,
  month: units.Month,
  quarter: units.Quarter,
  year: units.Year,
  season: units.Season,
}

// when a unit of time is spoken of as 'this month' - instead of 'february'
const nextLast = function (doc, context) {
  //this month, last quarter, next year
  let m = doc.match('^(weekday|week|month|weekend|quarter|season|year)$')
  if (m.found === true) {
    let str = m.text('reduced')
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
  m = doc.match('^#WeekDay$')
  if (m.found === true) {
    let str = m.text('reduced')
    let unit = new units.WeekDay(str, null, context)
    return unit
  }
  //
  // m = doc.match('^(month|week|weekend)$')
  // if (m.found === true) {
  //   return new units.Month(m.text('reduced'), null, context)
  // }
  return null
}
module.exports = nextLast
