const { Quarter, Season, Year } = require('../units')
const spacetime = require('spacetime')

const parseYearly = function (doc, context) {
  // support 'summer 2002'
  let m = doc.match('(spring|summer|winter|fall|autumn) [<year>#Year?]')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let unit = new Season(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'q4 2020'
  m = doc.match('#FinancialQuarter [<year>#Year?]')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support '2020'
  m = doc.match('^#Year$')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(null, context.timezone, { today: context.today })
    s = s.year(str)
    let unit = new Year(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  return null
}
module.exports = parseYearly