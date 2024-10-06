import parseDate from '../one/index.js'
import reverseMaybe from './_reverse.js'
import { Month, CalendarDate } from '../one/units/index.js'

export default [


  {
    // month-ranges have some folksy rules
    match: 'between [<start>#Month] and [<end>#Month] [<year>#Year?]',
    desc: 'between march and jan',
    parse: (m, context) => {
      let { start, end, year } = m.groups()
      let y = year && year.found ? Number(year.text('reduced')) : context.today.year()
      let obj = { month: start.text('reduced'), year: y }
      let left = new Month(obj, null, context).start()
      obj = { month: end.text('reduced'), year: y }
      let right = new Month(obj, null, context).start()
      if (left.d.isAfter(right.d)) {
        return {
          start: right,
          end: left,
        }
      }
      return {
        start: left,
        end: right,
      }
    },
  },

  {
    // two explicit dates - 'between friday and sunday'
    match: 'between [<start>.+] and [<end>.+]',
    desc: 'between friday and sunday',
    parse: (m, context) => {
      let start = m.groups('start')
      start = parseDate(start, context)
      let end = m.groups('end')
      end = parseDate(end, context)
      if (start && end) {
        end = end.before()
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
    match: '[<from>#Month #Value] (to|through|thru) [<to>#Month #Value] [<year>#Year?]',
    desc: 'june 5 to june 7',
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
        if (end) {
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
      }
      return null
    },
  },
  {
    // one month, one year, first form - 'january 5 to 7 1998'
    match: '[<month>#Month] [<from>#Value] (to|through|thru) [<to>#Value] of? [<year>#Year]',
    desc: 'january 5 to 7 1998',
    parse: (m, context) => {
      let { month, from, to, year } = m.groups()
      let year2 = year.clone()
      let start = from.prepend(month).append(year)
      start = parseDate(start, context)
      if (start) {
        let end = to.prepend(month).append(year2)
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
    match: '[<from>#Value] (to|through|thru) [<to>#Value of? #Month #Date+?]',
    desc: '5 to 7 of january 1998',
    parse: (m, context) => {
      let to = m.groups('to')
      to = parseDate(to, context)
      if (to) {
        let fromDate = m.groups('from')
        let from = to.clone()
        from.d = from.d.date(fromDate.text('implicit'))
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
    desc: 'january 5 to 7',
    parse: (m, context) => {
      let from = m.groups('from')
      from = parseDate(from, context)
      if (from) {
        let toDate = m.groups('to')
        let to = from.clone()
        to.d = to.d.date(toDate.text('implicit'))
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
    match: 'from? [<from>#Month] (to|until|upto|through|thru) [<to>#Month] [<year>#Year]',
    desc: 'january to may 2020',
    parse: (m, context) => {
      let from = m.groups('from')
      let year = m.groups('year').numbers().get()[0]
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
    // in 2 to 4 weeks
    match: '^in [<min>#Value] to [<max>#Value] [<unit>(days|weeks|months|years)]',
    desc: 'in 2 to 4 weeks',
    parse: (m, context) => {
      const { min, max, unit } = m.groups()

      let start = new CalendarDate(context.today, null, context)
      let end = start.clone()

      const duration = unit.text('implicit')
      start = start.applyShift({ [duration]: min.numbers().get()[0] })
      end = end.applyShift({ [duration]: max.numbers().get()[0] })

      return {
        start: start,
        end: end.end(),
      }
    },
  },
  {
    // 2 to 4 weeks ago
    match:
      '[<min>#Value] to [<max>#Value] [<unit>(days|weeks|months|years)] (ago|before|earlier|prior)',
    desc: '2 to 4 weeks ago',
    parse: (m, context) => {
      const { min, max, unit } = m.groups()

      let start = new CalendarDate(context.today, null, context)
      let end = start.clone()

      const duration = unit.text('implicit')
      start = start.applyShift({ [duration]: -max.numbers().get()[0] })
      end = end.applyShift({ [duration]: -min.numbers().get()[0] })

      return {
        start: start,
        end: end.end(),
      }
    },
  },



  {
    // implicit range
    match: '^until [<to>#Date+]',
    desc: 'until christmas',
    parse: (m, context) => {
      let to = m.groups('to')
      to = parseDate(to, context)
      if (to) {
        let start = new CalendarDate(context.today, null, context)
        return {
          start: start,
          end: to.start(),
        }
      }
      return null
    },
  },

  {
    // second half of march
    match: '[<part>(1st|initial|2nd|latter)] half of [<month>#Month] [<year>#Year?]',
    desc: 'second half of march',
    parse: (m, context) => {
      const { part, month, year } = m.groups()
      let obj = {
        month: month.text('reduced'),
        date: 1, //assume 1st
        year: year && year.found ? year.text('reduced') : context.today.year()
      }
      let unit = new Month(obj, null, context)
      if (part.has('(1st|initial)')) {
        return {
          start: unit.start(),
          end: unit.clone().middle(),
        }
      }
      return {
        start: unit.middle(),
        end: unit.clone().end(),
      }
    },
  },
]
