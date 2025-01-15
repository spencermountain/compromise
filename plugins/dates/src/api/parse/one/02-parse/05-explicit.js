import { Day, CalendarDate, Month, Moment } from '../units/index.js'

// parse things like 'june 5th 2019'
// most of this is done in spacetime
const parseExplicit = function (doc, context) {
  let impliedYear = context.today.year()
  // 'fifth of june 1992'
  // 'june the fifth 1992'
  let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]')
  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]')
  }
  if (m.found) {
    let obj = {
      month: m.groups('month').text('reduced'),
      date: m.groups('date').text('reduced'),
      year: m.groups('year').text() || impliedYear,
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // 'march 1992'
  m = doc.match('[<month>#Month] of? [<year>#Year]')
  if (m.found) {
    let obj = {
      month: m.groups('month').text('reduced'),
      year: m.groups('year').text('reduced') || impliedYear,
    }
    let unit = new Month(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // 'march 5th next year'
  m = doc.match('[<month>#Month] [<date>#Value+]? of? the? [<rel>(this|next|last|current)] year')
  if (m.found) {
    let rel = m.groups('rel').text('reduced')
    let year = impliedYear
    if (rel === 'next') {
      year += 1
    } else if (rel === 'last') {
      year -= 1
    }
    let obj = {
      month: m.groups('month').text('reduced'),
      date: m.groups('date').numbers(0).get()[0],
      year,
    }
    if (obj.date === undefined) {
      obj.date = 1
      let unit = new Month(obj, null, context)
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // '5th of next month'
  m = doc.match('^the? [<date>#Value+]? of? [<rel>(this|next|last|current)] month')
  if (m.found) {
    let month = context.today.month()
    let rel = m.groups('rel').text('reduced')
    if (rel === 'next') {
      month += 1
    } else if (rel === 'last') {
      month -= 1
    }
    let obj = {
      month,
      date: m.groups('date').numbers(0).get()[0],
    }
    let unit = new CalendarDate(obj, null, context)
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
  if (m.found) {
    let obj = {
      month: m.groups('month').text('reduced'),
      date: m.groups('date').text('reduced'),
      year: context.today.year(),
    }
    let unit = new CalendarDate(obj, null, context)
    // assume 'feb' in the future
    if (unit.d.month() < context.today.month()) {
      obj.year += 1
      unit = new CalendarDate(obj, null, context)
    }
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'december'
  if (doc.has('#Month')) {
    let obj = {
      month: doc.match('#Month').text('reduced'),
      date: 1, //assume 1st
      year: context.today.year(),
    }
    let unit = new Month(obj, null, context)
    // assume 'february' is always in the future
    if (unit.d.month() < context.today.month()) {
      obj.year += 1
      unit = new Month(obj, null, context)
    }
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // support 'thursday 21st'
  m = doc.match('#WeekDay [<date>#Value]')
  if (m.found) {
    let obj = {
      month: context.today.month(),
      date: m.groups('date').text('reduced'),
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
      date: m.groups('date').text('reduced'),
      year: context.today.year(),
    }
    let unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      // assume it's forward
      if (unit.d.isBefore(context.today)) {
        unit.d = unit.d.add(1, 'month')
      }
      return unit
    }
  }
  // parse ISO as a Moment
  m = doc.match('/[0-9]{4}-[0-9]{2}-[0-9]{2}t[0-9]{2}:/')
  if (m.found) {
    let str = doc.text('reduced')
    let unit = new Moment(str, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  let str = doc.text('reduced')
  if (!str) {
    return new Moment(context.today, null, context)
  }
  // punt it to spacetime, for the heavy-lifting
  let unit = new Day(str, null, context)
  // console.log(str, unit, context.today.year())
  // did we find a date?
  if (unit.d.isValid() === false) {
    return null
  }
  return unit
}
export default parseExplicit
