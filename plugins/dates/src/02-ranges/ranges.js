const parseDate = require('../parseDate/parse')
const Unit = require('../parseDate/units/Unit')

const reverseMaybe = function (obj) {
  let start = obj.start
  let end = obj.end
  if (start.d.isAfter(end.d)) {
    let tmp = start
    obj.start = end
    obj.end = tmp
  }
  return obj
}

const punt = function (unit, context) {
  unit = unit.applyShift(context.punt)
  return unit
}

module.exports = [
  {
    // two explicit dates - 'between friday and sunday'
    match: 'between [<start>*] and [<end>*]',
    parse: (m, context) => {
      let start = m.groups('start')
      start = parseDate(start, context)
      let end = m.groups('end')
      end = parseDate(end, context)
      end = end.before()
      if (start && end) {
        return {
          start: start,
          end: end,
        }
      }
      return null
    },
  },

  {
    // two months, no year - 'june 5 to june 7'
    match: '[<from>#Month #Value] (to|through|thru|and) [<to>#Month #Value] [<year>#Year?]',
    parse: (m, context) => {
      let res = m.groups()
      let start = res.from
      if (res.year) {
        start = start.append(res.year)
      }
      start = parseDate(start, context)
      if (start) {
        let end = res.to
        if (res.year) {
          end = end.append(res.year)
        }
        end = parseDate(end, context)
        // assume end is after start
        if (start.d.isAfter(end.d)) {
          end.d = end.d.add(1, 'year')
        }
        let obj = {
          start: start,
          end: end.end(),
        }
        return obj
      }
      return null
    },
  },
  {
    // one month, one year, first form - 'january 5 to 7 1998'
    match: '[<month>#Month] [<from>#Value] (to|through|thru) [<to>#Value] of? [<year>#Year]',
    parse: (m, context) => {
      let { month, from, to, year } = m.groups()
      let year2 = year.clone()
      let start = from.prepend(month.text()).append(year.text())
      start = parseDate(start, context)
      if (start) {
        let end = to.prepend(month.text()).append(year2)
        end = parseDate(end, context)
        return {
          start: start,
          end: end.end(),
        }
      }
      return null
    },
  },
  {
    // one month, one year, second form - '5 to 7 of january 1998'
    match: '[<from>#Value] (to|through|thru|and) [<to>#Value of? #Month of? #Year]',
    parse: (m, context) => {
      let to = m.groups('to')
      to = parseDate(to, context)
      if (to) {
        let fromDate = m.groups('to')
        let from = to.clone()
        from.d = from.d.date(fromDate.text('normal'))
        return {
          start: from,
          end: to.end(),
        }
      }
      return null
    },
  },

  {
    // one month, no year - '5 to 7 of january'
    match: '[<from>#Value] (to|through|thru|and) [<to>#Value of? #Month]',
    parse: (m, context) => {
      let to = m.groups('to')
      to = parseDate(to, context)
      if (to) {
        let fromDate = m.groups('from')
        let from = to.clone()
        from.d = from.d.date(fromDate.text('normal'))
        return {
          start: from,
          end: to.end(),
        }
      }
      return null
    },
  },

  {
    // one month, no year - 'january 5 to 7'
    match: '[<from>#Month #Value] (to|through|thru|and) [<to>#Value]',
    parse: (m, context) => {
      let from = m.groups('from')
      from = parseDate(from, context)
      if (from) {
        let toDate = m.groups('to')
        let to = from.clone()
        to.d = to.d.date(toDate.text('normal'))
        return {
          start: from,
          end: to.end(),
        }
      }
      return null
    },
  },

  {
    // 'january to may 2020'
    match: 'from? [<from>#Month] (to|until|upto|through|thru|and) [<to>#Month] [<year>#Year]',
    parse: (m, context) => {
      let from = m.groups('from')
      let year = from.groups('year').numbers().get(0)
      let to = m.groups('to')
      from = parseDate(from, context)
      to = parseDate(to, context)
      from.d = from.d.year(year)
      to.d = to.d.year(year)
      if (from && to) {
        let obj = {
          start: from,
          end: to.end(),
        }
        // reverse the order?
        obj = reverseMaybe(obj)
        return obj
      }
      return null
    },
  },

  {
    // '3pm to 4pm january 5th'
    match: '^from? [<time>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
    parse: (m, context) => {
      let time = m.groups('time')
      let to = m.groups('to')
      let end = parseDate(to, context)
      if (end) {
        let start = end.clone()
        start.applyTime(time.text())
        if (start) {
          let obj = {
            unit: 'time',
            start: start,
            end: end,
          }
          obj = reverseMaybe(obj)
          return obj
        }
      }
      return null
    },
  },
  {
    // 'january from 3pm to 4pm'
    match: '^from? [<from>*] (to|until|upto|through|thru|and) [<to>#Time+]',
    parse: (m, context) => {
      let from = m.groups('from')
      let to = m.groups('to')
      from = parseDate(from, context)
      if (from) {
        let end = from.clone()
        end.applyTime(to.text())
        if (end) {
          let obj = {
            unit: 'time',
            start: from,
            end: end,
          }
          obj = reverseMaybe(obj)
          return obj
        }
      }
      return null
    },
  },
  {
    // 'from A to B'
    match: 'from? [<from>*] (to|until|upto|through|thru|and) [<to>*]',
    parse: (m, context) => {
      let from = m.groups('from')
      let to = m.groups('to')
      from = parseDate(from, context)
      to = parseDate(to, context)
      if (from && to) {
        let obj = {
          start: from,
          end: to.end(),
        }
        obj = reverseMaybe(obj)
        return obj
      }
      return null
    },
  },

  {
    // 'before june'
    match: '^due? (by|before) [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      if (unit) {
        let start = new Unit(context.today, null, context)
        if (start.d.isAfter(unit.d)) {
          start = unit.clone().applyShift({ weeks: -2 })
        }
        // end the night before
        let end = unit.clone().applyShift({ day: -1 })
        return {
          start: start,
          end: end.end(),
        }
      }
      return null
    },
  },

  {
    // 'in june'
    match: '^(on|in|at|@|during) [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      if (unit) {
        return { start: unit, end: unit.clone().end(), unit: unit.unit }
      }
      return null
    },
  },
  {
    // 'after june'
    match: '^(after|following) [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      if (unit) {
        unit = unit.after()
        return {
          start: unit.clone(),
          end: punt(unit.clone(), context),
        }
      }
      return null
    },
  },
  {
    // 'middle of'
    match: '^(middle|center|midpoint) of [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      let start = unit.clone().middle()
      let end = unit.beforeEnd()
      if (unit) {
        return {
          start: start,
          end: end,
        }
      }
      return null
    },
  },
  {
    // 'tuesday after 5pm'
    match: '* after #Time+$',
    parse: (m, context) => {
      let unit = parseDate(m, context)
      let start = unit.clone()
      let end = unit.end()
      if (unit) {
        return {
          unit: 'time',
          start: start,
          end: end,
        }
      }
      return null
    },
  },
  {
    // 'tuesday before noon'
    match: '* before #Time+$',
    parse: (m, context) => {
      let unit = parseDate(m, context)
      let end = unit.clone()
      let start = unit.start()
      if (unit) {
        return {
          unit: 'time',
          start: start,
          end: end,
        }
      }
      return null
    },
  },
]
