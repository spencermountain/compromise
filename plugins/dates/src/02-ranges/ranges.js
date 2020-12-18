const parseDate = require('../parseDate/parse')
const Unit = require('../parseDate/units/Unit')

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
      if (start && end) {
        return {
          start: start,
          end: end.before(),
        }
      }
      return null
    },
  },

  {
    // two months, no year - 'june 5 to june 7'
    match: '[<from>#Month #Value] (to|through|thru) [<to>#Month #Value] [<year>#Year?]',
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
        // reverse the order?
        if (start.d.isAfter(end.d)) {
          let tmp = start
          start = end
          end = tmp
        }
        return {
          start: start,
          end: end.end(),
        }
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
    match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month of? #Year]',
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
    match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month]',
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
    match: '[<from>#Month #Value] (to|through|thru) [<to>#Value]',
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
    // 'from A to B'
    match: 'from? [<from>*] (to|until|upto|through|thru) [<to>*]',
    parse: (m, context) => {
      let from = m.groups('from')
      let to = m.groups('to')
      from = parseDate(from, context)
      to = parseDate(to, context)
      if (from && to) {
        return {
          start: from,
          end: to.end(),
        }
      }
      return null
    },
  },

  // {
  //   // 'A through B' (inclusive end)
  //   match: 'from? [<a>*] (through|thru) [<b>*]',
  //   parse: (m, context) => {
  //     let from = m.groups('a')
  //     let to = m.groups('b')
  //     from = parseDate(from, context)
  //     to = parseDate(to, context)
  //     if (from && to) {
  //       return {
  //         start: from,
  //         end: to.end(),
  //       }
  //     }
  //     return null
  //   },
  // },

  // {
  //   // 'A until B' (not inclusive end)
  //   match: 'from? [<a>*] (to|until|upto) [<b>*]',
  //   parse: (m, context) => {
  //     let from = m.groups('a')
  //     let to = m.groups('b')
  //     from = parseDate(from, context)
  //     to = parseDate(to, context)
  //     if (from && to) {
  //       return {
  //         start: from,
  //         end: to.end(),
  //       }
  //     }
  //     return null
  //   },
  // },

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
    match: '^(on|in|at|@) [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      if (unit) {
        return { start: unit, end: unit.clone().end() }
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
    // 'in june'
    match: '^(on|during|in|during) [*]',
    group: 0,
    parse: (m, context) => {
      let unit = parseDate(m, context)
      if (unit) {
        return {
          start: unit,
          end: unit.clone().end(),
        }
      }
      return null
    },
  },
]
