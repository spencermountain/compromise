const { Quarter, Season, Week } = require('../units/_units')
const spacetime = require('spacetime')

const parseYearly = function (doc, context) {
  // support 'summer 2002'
  let m = doc.match('(spring|summer|winter|fall|autumn)')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let unit = new Season(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'q4 2020'
  m = doc.match('#FinancialQuarter #Year?')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  return null
}
module.exports = parseYearly
