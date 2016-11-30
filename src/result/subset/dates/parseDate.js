'use strict';

//
const isDate = (num) => {
  if (num && num < 31 && num > 0) {
    return true
  }
  return false
}

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true
  }
  return false
}

//
const parseDate = (r) => {
  let result = {
    month: null,
    date: null,
    weekday: null,
    year: null,
    time: null,
    knownDate: null
  }
  let m = r.match('(#Holiday|today|tomorrow|yesterday)')
  if (m.found) {
    result.knownDate = m.normal()
  }
  m = r.match('#Month')
  if (m.found) {
    result.month = m.terms()[0].month.index()
  }
  m = r.match('#WeekDay')
  if (m.found) {
    result.weekday = m.terms()[0].weekday.index()
  }
  m = r.match('#Time')
  if (m.found) {
    result.time = m.normal()
  }

  //january fifth 1992
  m = r.match('#Month #Value #Cardinal')
  if (m.found) {
    let values = m.values().parse()
    if (isDate(values[0].cardinal)) {
      result.date = values[0].cardinal
        //try a second one
      if (values[1] && isYear(values[1].cardinal)) {
        result.year = values[1].cardinal
      }
    }
  }
  if (!m.found) {
    //january fifth,  january 1992
    m = r.match('#Month #Value')
    if (m.found) {
      let values = m.values().parse()
      let num = values[0].cardinal
      if (isDate(num)) {
        result.date = num
      } else if (isYear(num)) {
        result.year = num
      }
    }
  }

  //fifth of january
  m = r.match('#Value of #Month')
  if (m.found) {
    let o = m.values().parse()[0] || {}
    let num = o.cardinal
    if (isDate(num)) {
      result.date = num
    }
  }
  return result
}
module.exports = parseDate
