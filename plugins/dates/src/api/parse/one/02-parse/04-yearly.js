import { Quarter, Season, Year } from '../units/index.js'
import spacetime from 'spacetime'

const fmtToday = function (context) {
  return {
    date: context.today.date(),
    month: context.today.month(),
    year: context.today.year(),
  }
}

const parseYearly = function (doc, context) {
  // support 'summer 2002'
  let m = doc.match('(spring|summer|winter|fall|autumn) [<year>#Year?]')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(str, context.timezone, { today: fmtToday(context) })
    let unit = new Season(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'q4 2020'
  m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]')
  if (m.found) {
    let str = m.groups('q').text('reduced')
    let s = spacetime(str, context.timezone, { today: fmtToday(context) })
    if (m.groups('year')) {
      let year = Number(m.groups('year').text()) || context.today.year()
      s = s.year(year)
    }
    let unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support '4th quarter 2020'
  m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]')
  if (m.found) {
    let q = m.groups('q').text('reduced')
    let s = spacetime(`q${q}`, context.timezone, { today: fmtToday(context) })
    if (m.groups('year')) {
      let year = Number(m.groups('year').text()) || context.today.year()
      s = s.year(year)
    }
    let unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support '2020'
  m = doc.match('^#Year$')
  if (m.found) {
    let str = doc.text('reduced')
    let s = spacetime(null, context.timezone, { today: fmtToday(context) })
    s = s.year(str)
    let unit = new Year(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  return null
}
export default parseYearly
