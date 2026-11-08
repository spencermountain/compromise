import parseDate from '../one/index.js'
import reverseMaybe from './_reverse.js'
import { Month, Year, CalendarDate, Moment } from '../one/units/index.js'

const clockUnits = /^(hour|minute|second|hr|min|sec)s?$/

// 'the next 3 days' - a window of whole units, starting tomorrow or ending yesterday
// 'within 2 weeks' includes today
const rollingWindow = function (m, context, dir, fromToday) {
  let num = m.match('#Value').numbers().get()[0]
  // 'the next few days'
  if (!num && m.has('few')) {
    num = 3
  }
  if (!num && m.has('couple')) {
    num = 2
  }
  const unit = m.match('#Duration').text('reduced')
  if (!num || !unit) {
    return null
  }
  // 'the next 3 hours' is measured from right now
  if (clockUnits.test(unit)) {
    const now = new Moment(context.today, null, context)
    const then = now.clone().applyShift({ [unit]: num * dir })
    return dir > 0 ? { start: now, end: then, unit: 'time' } : { start: then, end: now, unit: 'time' }
  }
  const today = new CalendarDate(context.today, null, context)
  const edge = today.clone().applyShift({ [unit]: num * dir })
  if (dir > 0) {
    const start = fromToday ? today : today.clone().applyShift({ day: 1 })
    return { start, end: edge.end() }
  }
  const end = fromToday ? today.clone() : today.clone().applyShift({ day: -1 })
  return { start: edge, end: end.end() }
}

// fuzzy positions in a month - early is the 1st-14th, mid the 10th-20th, late the 21st onward
const fuzzyDays = {
  early: [1, 14],
  mid: [10, 20],
  late: [21, null],
}
const whichPart = function (m) {
  if (m.has('(early|start|beginning)')) {
    return 'early'
  }
  if (m.has('(mid|middle|midpoint)')) {
    return 'mid'
  }
  if (m.has('(late|end|ending)')) {
    return 'late'
  }
  return null
}
// the month a fuzzy phrase refers to, as a parsed unit
const monthOf = function (m, context) {
  let doc = m.match('(next|this|last|the)? #Month #Year?')
  if (!doc.found) {
    doc = m.match('(next|this|last) month')
  }
  const unit = doc.found ? parseDate(doc, context) : null
  if (!unit || unit.unit !== 'month') {
    return null
  }
  return unit
}
const fuzzyRange = function (unit, part) {
  const [from, to] = fuzzyDays[part]
  const start = unit.start()
  const end = unit.clone().end()
  start.d = start.d.date(from)
  if (to) {
    end.d = end.d.date(to).endOf('day')
  }
  return { start, end }
}

export default [

  {
    // the next 3 days
    match: '^(in|over|for|during)? the? (next|coming|following) (#Value|few|couple) of? #Duration$',
    desc: 'next 3 days',
    parse: (m, context) => rollingWindow(m, context, 1, false),
  },
  {
    // the last 3 days
    match: '^(in|over|for|during)? the? (last|past|previous) (#Value|few|couple) of? #Duration$',
    desc: 'last 3 days',
    parse: (m, context) => rollingWindow(m, context, -1, false),
  },
  {
    // within 2 weeks
    match: '^within the? next? #Value #Duration$',
    desc: 'within 2 weeks',
    parse: (m, context) => rollingWindow(m, context, 1, true),
  },
  {
    // 'tomorrow at 2pm for two hours', 'september 10 for three days'
    match: '.+ for #Value #Duration$',
    desc: 'for two hours',
    parse: (m, context) => {
      const start = parseDate(m.not('for #Value #Duration$'), context)
      const num = m.match('for [#Value]', 0).numbers().get()[0]
      const unit = m.match('#Duration$').text('reduced')
      if (!start || !num) {
        return null
      }
      const end = start.clone().applyShift({ [unit]: num })
      if (clockUnits.test(unit)) {
        // 'tuesday for 30 mins' has no start-time to count from
        if (!start.setTime) {
          return null
        }
        return { start, end, unit: 'time' }
      }
      end.d = end.d.minus(1, 'millisecond')
      return { start, end }
    },
  },


  {
    // month-ranges have some folksy rules
    match: 'between [<start>#Month] and [<end>#Month] [<year>#Year?]',
    desc: 'between march and jan',
    parse: (m, context) => {
      const { start, end, year } = m.groups()
      let y = year && year.found ? Number(year.text('reduced')) : context.today.year()
      let obj = { month: start.text('reduced'), year: y }
      let left = new Month(obj, null, context).start()
      // 'between june and july' - assume the future, like 'june' alone does
      if (!(year && year.found) && left.d.month() < context.today.month()) {
        y += 1
        left = new Month({ ...obj, year: y }, null, context).start()
      }
      obj = { month: end.text('reduced'), year: y }
      let right = new Month(obj, null, context).start()
      if (left.d.isAfter(right.d)) {
        const tmp = left
        left = right
        right = tmp
      }
      // 'between' is exclusive - end where the last month starts
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
      const startM = m.groups('start')
      const start = parseDate(startM, context)
      const endM = m.groups('end')
      let end = parseDate(endM, context)
      // 'between june 2nd and 5th' - inherit the month
      if (start && !end && endM.has('^#Value$') && startM.has('#Month')) {
        end = start.clone()
        end.d = end.d.date(endM.numbers().get()[0])
      }
      if (start && end) {
        let obj = {
          start: start,
          end: end,
        }
        obj = reverseMaybe(obj)
        // 'between' is exclusive of the end-date
        obj.end = obj.end.before()
        return obj
      }
      return null
    },
  },

  {
    // two months, no year - 'june 5 to june 7'
    match: '[<from>#Month #Value] (to|until|upto|through|thru) [<to>#Month #Value] [<year>#Year?]',
    desc: 'june 5 to june 7',
    parse: (m, context) => {
      const res = m.groups()
      let start = res.from.clone()
      let end = res.to.clone()
      const year = res.year?.text('reduced')
      if (year) {
        start.append(year)
        end.append(year)
      }
      start = parseDate(start, context)
      if (start) {
        end = parseDate(end, context)
        if (end) {
          // assume end is after start
          if (start.d.isAfter(end.d)) {
            end.d = end.d.add(1, 'year')
          }
          const obj = {
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
    // two day-of-month dates - '28th of September to 5th of October 2008'
    match:
      '[<from>#Value] of? [<fromMonth>#Month] (to|until|upto|through|thru) [<to>#Value] of? [<toMonth>#Month] [<year>#Year?]',
    desc: '28th of September to 5th of October 2008',
    parse: (m, context) => {
      const { from, fromMonth, to, toMonth, year } = m.groups()
      let start = from.clone().append(fromMonth)
      let end = to.clone().append(toMonth)
      if (year && year.found) {
        start = start.append(year)
        end = end.append(year)
      }
      start = parseDate(start, context)
      end = parseDate(end, context)
      if (start && end) {
        if (start.d.isAfter(end.d)) {
          end.d = end.d.add(1, 'year')
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
    match: '[<month>#Month] [<from>#Value] (to|until|upto|through|thru) [<to>#Value] of? [<year>#Year]',
    desc: 'january 5 to 7 1998',
    parse: (m, context) => {
      const { month, from, to, year } = m.groups()
      const year2 = year.clone()
      let start = from.clone().prepend(month).append(year)
      start = parseDate(start, context)
      if (start) {
        let end = to.prepend(month).append(year2)
        end = parseDate(end, context)
        if (end) {
          return {
            start: start,
            end: end.end(),
          }
        }
      }
      return null
    },
  },
  {
    // one month, one year, second form - '5 to 7 of january 1998'
    match: '#Value (to|until|upto|through|thru) the? #Value of? #Month #Date+?',
    desc: '5 to 7 of january 1998',
    parse: (m, context) => {
      // sub-matches, not groups - 'the tenth' may have shifted group pointers
      const values = m.match('#Value')
      const to = parseDate(m.match('#Value of? #Month #Date+?$'), context)
      if (to) {
        const from = to.clone()
        from.d = from.d.date(values.eq(0).text('implicit'))
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
    match: '[<from>#Month #Value] (to|until|upto|through|thru) [<to>#Value]',
    desc: 'january 5 to 7',
    parse: (m, context) => {
      let from = m.groups('from')
      from = parseDate(from, context)
      if (from) {
        const toDate = m.groups('to')
        const to = from.clone()
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
      const year = m.groups('year').numbers().get()[0]
      let to = m.groups('to')
      from = parseDate(from, context)
      to = parseDate(to, context)
      if (from && to) {
        from.d = from.d.year(year)
        to.d = to.d.year(year)
        // 'aug to june 1999' starts the year before
        if (from.d.isAfter(to.d)) {
          from.d = from.d.minus(1, 'year')
        }
        return {
          start: from,
          end: to.end(),
        }
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
    match: '^until #Date+',
    desc: 'until christmas',
    parse: (m, context) => {
      const to = parseDate(m.not('^until'), context)
      if (to) {
        const start = new CalendarDate(context.today, null, context)
        return {
          start: start,
          end: to.start(),
        }
      }
      return null
    },
  },
  {
    // 'through march 1' - from today, including the end
    match: '^(through|thru) #Date+',
    desc: 'through march 1',
    parse: (m, context) => {
      const to = parseDate(m.not('^(through|thru)'), context)
      if (to) {
        const start = new CalendarDate(context.today, null, context)
        return {
          start: start,
          end: to.end(),
        }
      }
      return null
    },
  },
  {
    // 'since 2020' - from then, until today
    match: '^since #Date+',
    desc: 'since 2020',
    parse: (m, context) => {
      const from = parseDate(m.not('^since'), context)
      if (from) {
        const end = new CalendarDate(context.today, null, context)
        return {
          start: from.start(),
          end: end.end(),
        }
      }
      return null
    },
  },

  {
    // first half of 2027
    match: '(first|1st|initial|second|2nd|latter) half of #Year',
    desc: 'first half of 2027',
    parse: (m, context) => {
      const year = new Year({ year: Number(m.match('#Year').text('reduced')) }, null, context)
      const july = year.clone()
      july.d = july.d.add(6, 'months')
      if (m.has('^(first|1st|initial)')) {
        july.d = july.d.minus(1, 'millisecond')
        return { start: year, end: july }
      }
      return { start: july, end: year.clone().end() }
    },
  },

  {
    // early to mid june, late june to early july 2027
    match: '^(in|during)? (early|mid|late) #Month? (to|through|until) (early|mid|late) (next|this|last|the)? #Month #Year?$',
    desc: 'early to mid june',
    parse: (m, context) => {
      const parts = m.match('(early|mid|late)')
      const fromDoc = m.match('[.+] (to|through|until)', 0)
      const toUnit = monthOf(m.match('(to|through|until) [.+]', 0), context)
      if (!toUnit) {
        return null
      }
      // 'late june to early july 2027' - the first month shares the year
      let fromUnit = toUnit.clone()
      if (fromDoc.has('#Month')) {
        fromUnit = monthOf(fromDoc, context)
        if (!fromUnit) {
          return null
        }
        fromUnit.d = fromUnit.d.year(toUnit.d.year())
      }
      const { start } = fuzzyRange(fromUnit, parts.eq(0).text('reduced'))
      const { end } = fuzzyRange(toUnit, parts.eq(1).text('reduced'))
      return { start, end }
    },
  },

  {
    // early june, mid next month, towards the end of march
    match: '^(in|during)? (early|mid|late|middle|midpoint|towards|toward) .+$',
    desc: 'early june',
    parse: (m, context) => {
      const part = whichPart(m)
      const unit = monthOf(m, context)
      // only months, for now - 'early evening' is a time
      if (!part || !unit) {
        return null
      }
      return fuzzyRange(unit, part)
    },
  },

  {
    // second half of march
    match: '(first|1st|initial|second|2nd|latter) half of #Month #Year?',
    desc: 'second half of march',
    parse: (m, context) => {
      // sub-matches, not groups - 'the second' may have shifted group pointers
      const year = m.match('#Year')
      const obj = {
        month: m.match('#Month').text('reduced'),
        date: 1, //assume 1st
        year: year.found ? year.text('reduced') : context.today.year()
      }
      const unit = new Month(obj, null, context)
      // 'first half of march' - assume the future, like 'march' alone does
      if (!year.found && unit.d.month() < context.today.month()) {
        unit.d = unit.d.add(1, 'year')
      }
      if (m.has('^(first|1st|initial)')) {
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
