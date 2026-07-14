import { Quarter, Season, Year } from '../units/index.js'
import spacetime from 'spacetime'

const fmtToday = function (context) {
  return {
    date: context.today.date(),
    month: context.today.month(),
    year: context.today.year(),
  }
}

// "'69" becomes 1969
const fixYear = function (str) {
  const num = Number(str)
  if (num && num < 100) {
    return num > 31 ? 1900 + num : 2000 + num
  }
  return num || null
}

const parseYearly = function (doc, context) {
  // support 'summer 2002', 'summer of 69'
  let m = doc.match('[<season>(spring|summer|winter|fall|autumn)] of? [<year>(#Year|#Cardinal)?]')
  if (m.found) {
    const str = m.groups('season').text('reduced')
    let s = spacetime(str, context.timezone, { today: fmtToday(context) })
    const yr = m.groups('year')
    if (yr.found) {
      const num = fixYear(yr.text('reduced'))
      if (num) {
        s = s.year(num)
      }
    }
    const unit = new Season(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'q4 2020'
  m = doc.match('[<q>#FinancialQuarter] [<year>#Year?]')
  if (m.found) {
    const str = m.groups('q').text('reduced')
    let s = spacetime(str, context.timezone, { today: fmtToday(context) })
    if (m.groups('year').found) {
      const year = Number(m.groups('year').text()) || context.today.year()
      s = s.year(year)
    }
    const unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support '4th quarter 2020'
  m = doc.match('[<q>#Value] quarter (of|in)? [<year>#Year?]')
  if (m.found) {
    const q = m.groups('q').text('reduced')
    let s = spacetime(`q${q}`, context.timezone, { today: fmtToday(context) })
    if (m.groups('year').found) {
      const year = Number(m.groups('year').text()) || context.today.year()
      s = s.year(year)
    }
    const unit = new Quarter(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support '2020'
  m = doc.match('^#Year$')
  if (m.found) {
    const str = doc.text('reduced')
    let s = spacetime(null, context.timezone, { today: fmtToday(context) })
    s = s.year(str)
    const unit = new Year(s, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  return null
}
export default parseYearly
