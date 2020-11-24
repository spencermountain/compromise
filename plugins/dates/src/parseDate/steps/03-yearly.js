const { Quarter, Season, Week } = require('../_units')
const spacetime = require('spacetime')

const parseYearly = function (doc, context) {
  // support 'summer 2002'
  let m = doc.match('(spring|summer|winter|fall|autumn)')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let d = new Season(s, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }

  // support 'q4 2020'
  m = doc.match('#FinancialQuarter #Year?')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: context.today })
    let d = new Quarter(s, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }

  // support 'first week of 2019'
  m = doc.match('[<num>#Value] week (of|in) [<year>#Year]')
  if (m.found) {
    let num = m.groups('num').text('reduced')
    let year = m.groups('year').text('reduced')
    let s = spacetime(null, context.timezone, { today: context.today }).year(year)
    s = s.startOf('year').startOf('week')
    s = s.add(num - 1, 'weeks')
    let d = new Week(s, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }

  return null
}
module.exports = parseYearly
