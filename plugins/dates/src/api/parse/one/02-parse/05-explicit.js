import { Day, CalendarDate, Month, Moment } from '../units/index.js'

// "'98" becomes 1998
const fixYear = function (str) {
  const num = Number(str)
  if (num && num < 100) {
    return num > 31 ? 1900 + num : 2000 + num
  }
  return str
}

// parse things like 'june 5th 2019'
// most of this is done in spacetime
const parseExplicit = function (doc, context) {
  const impliedYear = context.today.year()
  // 'fifth of june 1992'
  // 'june the fifth 1992'
  let m = doc.match('[<date>#Value] of? [<month>#Month] [<year>#Year]')
  if (!m.found) {
    m = doc.match('[<month>#Month] the? [<date>#Value] [<year>#Year]')
  }
  if (m.found) {
    const obj = {
      month: m.groups('month').text('reduced'),
      date: m.groups('date').text('reduced'),
      year: fixYear(m.groups('year').text()) || impliedYear,
    }
    const unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // 'march 1992'
  m = doc.match('[<month>#Month] of? [<year>#Year]')
  if (m.found) {
    const obj = {
      month: m.groups('month').text('reduced'),
      year: fixYear(m.groups('year').text('reduced')) || impliedYear,
    }
    const unit = new Month(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // 'march 5th next year'
  m = doc.match('[<month>#Month] [<date>#Value+]? of? the? [<rel>(this|next|last|current)] year')
  if (m.found) {
    const rel = m.groups('rel').text('reduced')
    let year = impliedYear
    if (rel === 'next') {
      year += 1
    } else if (rel === 'last') {
      year -= 1
    }
    const obj = {
      month: m.groups('month').text('reduced'),
      date: m.groups('date').numbers(0).get()[0],
      year,
    }
    if (obj.date === undefined) {
      obj.date = 1
      const unit = new Month(obj, null, context)
      if (unit.d.isValid() === true) {
        return unit
      }
    }
    const unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }

  // '5th of next month'
  m = doc.match('^the? [<date>#Value+]? of? [<rel>(this|next|last|current)] month')
  if (m.found) {
    let month = context.today.month()
    let year = context.today.year()
    const rel = m.groups('rel').text('reduced')
    if (rel === 'next') {
      month += 1
      if (month > 11) {
        month = 0
        year += 1
      }
    } else if (rel === 'last') {
      month -= 1
      if (month < 0) {
        month = 11
        year -= 1
      }
    }
    const obj = {
      month,
      year,
      date: m.groups('date').numbers(0).get()[0],
    }
    const unit = new CalendarDate(obj, null, context)
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
    const obj = {
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
    const obj = {
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
    const obj = {
      month: context.today.month(),
      date: m.groups('date').text('reduced'),
      year: context.today.year(),
    }
    const unit = new CalendarDate(obj, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  // support date-only 'the 21st'
  m = doc.match('the [<date>#Value]')
  if (m.found) {
    const obj = {
      month: context.today.month(),
      date: m.groups('date').text('reduced'),
      year: context.today.year(),
    }
    const unit = new CalendarDate(obj, null, context)
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
    const str = doc.text('reduced')
    const unit = new Moment(str, null, context)
    if (unit.d.isValid() === true) {
      return unit
    }
  }
  const str = doc.text('reduced')
  if (!str) {
    return new Moment(context.today, null, context)
  }
  // punt it to spacetime, for the heavy-lifting
  const unit = new Day(str, null, context)
  // console.log(str, unit, context.today.year())
  // did we find a date?
  if (unit.d.isValid() === false) {
    return null
  }
  return unit
}
export default parseExplicit
