const { Unit, Day, CalendarDate } = require('../_units')

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

// parse things like 'june 5th 2019'
// most of this is done in spacetime
const parseExplicit = function (doc, context) {
  let impliedYear = context.today.year()
  // 'fifth of june'
  let m = doc.match('[<date>#Value] of [<month>#Month] [<year>#Year?]')
  // 'june the fifth'
  if (!m.found) {
    m = doc.match('[<month>#Month] the [<date>#Value] [<year>#Year?]')
  }
  if (m.found) {
    let obj = {
      month: m.groups('month').text(),
      date: m.groups('date').text(),
      year: m.groups('year').text() || impliedYear,
    }
    let d = new CalendarDate(obj, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }

  if (m.found) {
    let obj = {
      month: m.groups('month').text(),
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
  let d = new Unit(str, null, context)
  // did we find a date?
  if (d.d.isValid() === false) {
    return null
  }
  return d
}
module.exports = parseExplicit
