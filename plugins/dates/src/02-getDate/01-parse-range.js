const parseDate = require('../03-parseDate')
const Unit = require('../03-parseDate/Unit')

const punt = function (unit, context) {
  unit = unit.applyShift(context.casual_duration)
  return unit
}

//
const logic = function (doc, context) {
  // two explicit dates - 'between friday and sunday'
  let m = doc.match('between [<start>*] and [<end>*]')
  if (m.found) {
    let start = m.groups('start')
    start = parseDate(start, context)
    let end = m.groups('end')
    end = parseDate(end, context)
    if (start) {
      return {
        start: start,
        end: end,
      }
    }
  }

  // two months, no year - 'june 5 to june 7'
  m = doc.match('[<from>#Month #Value] to [<to>#Month #Value] [<year>#Year?]')
  if (m.found) {
    let res = m.groups()
    let start = res.from
    if (res.year) {
      start = start.concat(res.year)
    }
    start = parseDate(start, context)
    if (start) {
      let end = res.to
      if (res.year) {
        end = end.concat(res.year)
      }
      end = parseDate(end, context)
      return {
        start: start,
        end: end,
      }
    }
  }
  // one month, one year, first form - 'january 5 to 7 1998'
  m = doc.match('[<month>#Month] [<from>#Value] to [<to>#Value] of? [<year>#Year]')
  if (m.found) {
    let res = m.groups()
    let start = res.month.concat(res.from, res.year)
    start = parseDate(start, context)
    if (start) {
      let end = res.month.concat(res.to, res.year)
      end = parseDate(end, context)
      return {
        start: start,
        end: end,
      }
    }
  }
  // one month, one year, second form - '5 to 7 of january 1998'
  m = doc.match('[<from>#Value] to [<to>#Value of? #Month of? #Year]')
  if (m.found) {
    let to = m.groups('to')
    to = parseDate(to, context)
    if (to) {
      let fromDate = m.groups('to')
      let from = to.clone()
      from.d = from.d.date(fromDate.text('normal'))
      return {
        start: from,
        end: to,
      }
    }
  }
  // one month, no year - '5 to 7 of january'
  m = doc.match('[<from>#Value] to [<to>#Value of? #Month]')
  if (m.found) {
    let to = m.groups('to')
    to = parseDate(to, context)
    if (to) {
      let fromDate = m.groups('from')
      let from = to.clone()
      from.d = from.d.date(fromDate.text('normal'))
      return {
        start: from,
        end: to,
      }
    }
  }
  // one month, no year - 'january 5 to 7'
  m = doc.match('[<from>#Month #Value] to [<to>#Value]')
  if (m.found) {
    let from = m.groups('from')
    from = parseDate(from, context)
    if (from) {
      let toDate = m.groups('to')
      let to = from.clone()
      to.d = to.d.date(toDate.text('normal'))
      return {
        start: from,
        end: to,
      }
    }
  }
  // 'from A to B'
  m = doc.match('from? [<from>*] (to|@hasHyphen|until|upto) [<to>*]')
  if (m.found) {
    let from = m.groups('from')
    let to = m.groups('to')
    from = parseDate(from, context)
    to = parseDate(to, context)
    if (from && to) {
      return {
        start: from,
        end: to,
      }
    }
  }
  // 'before june'
  m = doc.match('^due (by|before|on|in)? [*]', 0)
  if (m.found) {
    let d = parseDate(m, context)
    if (d) {
      const today = new Unit(context.today, null, context)
      return {
        start: today,
        end: punt(d.clone(), context),
      }
    }
  }
  // 'after june'
  m = doc.match('^(after|following|from) [*]', 0)
  if (m.found) {
    let d = parseDate(m, context)
    if (d) {
      return {
        start: d,
        end: punt(d.clone(), context),
      }
    }
  }
  // 'in june'
  m = doc.match('^(on|during|in) [*]', 0)
  if (m.found) {
    let d = parseDate(m, context)
    if (d) {
      return {
        start: d,
        end: d.clone().end(),
      }
    }
  }
  //else, try whole thing
  let d = parseDate(doc, context)
  if (d) {
    return {
      start: d,
      end: d.clone().end(),
    }
  }
  return {
    start: null,
    end: null,
  }
}
module.exports = logic
