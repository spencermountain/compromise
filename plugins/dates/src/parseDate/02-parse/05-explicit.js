const { Unit, Day, CalendarDate, Month } = require('../units')

const knownWord = {
  today: (context) => {
    return new Day(context.today, null, context)
  },
  yesterday: (context) => {
    return new Day(context.today.minus(1, 'day'), null, context)
  },
  tomorrow: (context) => {
    return new Day(context.today.plus(1, 'day'), null, context)
  },
}
knownWord.tommorrow = knownWord.tomorrow

// parse things like 'june 5th 2019'
// most of this is done in spacetime
const parseExplicit = function (doc, context) {
  let impliedYear = context.today.year()

  // 'fifth of june 1992'
  let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]')
  // 'june the fifth 1992'
  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]')
  }
  if (m.found) {
    let obj = {
      month: m.groups('month').text(),
      date: m.groups('date').text(),
      year: m.groups('year').text() || impliedYear,
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  //no-dates
  // 'march 1992'
  m = doc.match('[<month>#Month] of? [<year>#Year]')
  if (m.found) {
    let obj = {
      month: m.groups('month').text(),
      year: m.groups('year').text() || impliedYear,
    }
    let unit = new Month(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  //no-years
  // 'fifth of june'
  m = doc.match('[<date>#Value] of? [<month>#Month]')
  // 'june the fifth'
  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value]')
  }
  // support 'dec 5th'
  if (m.found) {
    let obj = {
      month: m.groups('month').text(),
      date: m.groups('date').text(),
      year: context.today.year(),
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support 'december'
  if (doc.has('#Month')) {
    let obj = {
      month: doc.match('#Month').text(),
      date: 1, //assume 1st
      year: context.today.year(),
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support date-only 'the 21st'
  m = doc.match('the [<date>#Value]')
  if (m.found) {
    let obj = {
      month: context.today.month(),
      date: m.groups('date').text(),
      year: context.today.year(),
    }
    let d = new CalendarDate(obj, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }
  let str = doc.text('reduced')
  // today, yesterday, tomorrow
  if (knownWord.hasOwnProperty(str) === true) {
    let d = knownWord[str](context)
    return d
  }
  // punt it to spacetime, for the heavy-lifting
  let unit = new Unit(str, null, context)
  // did we find a date?
  if (unit.d.isValid() === false) {
    return null
  }
  return unit
}
module.exports = parseExplicit
