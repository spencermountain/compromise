import parseDate from '../one/index.js'
import reverseMaybe from './_reverse.js'

const moveToPM = function (obj) {
  const start = obj.start
  const end = obj.end
  if (start.d.isAfter(end.d)) {
    if (end.d.hour() < 10) {
      end.d = end.d.ampm('pm')
    }
  }
  return obj
}

export default [
  {
    // '3pm to 4pm january 5th'
    match: '[<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
    desc: '3pm to 4pm january 5th',
    parse: (m, context) => {
      const from = m.groups('from')
      const to = m.groups('to')
      const end = parseDate(to, context)
      if (end) {
        const start = end.clone()
        start.applyTime(from.text('implicit'))
        if (start) {
          let obj = {
            start: start,
            end: end,
            unit: 'time',
          }
          if (/(am|pm)/.test(to) === false) {
            obj = moveToPM(obj)
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
    match: '[<main>#Date+] from [<a>#Time] (to|until|upto|through|thru|and) [<b>#Time+]',
    desc: 'january from 3pm to 4pm',
    parse: (m, context) => {
      let main = m.groups('main')
      const a = m.groups('a')
      const b = m.groups('b')
      main = parseDate(main, context)
      if (main) {
        main.applyTime(a.text('implicit'))
        const end = main.clone()
        end.applyTime(b.text('implicit'))
        if (end) {
          let obj = {
            start: main,
            end: end,
            unit: 'time',
          }
          if (/(am|pm)/.test(b.text()) === false) {
            obj = moveToPM(obj)
          }
          obj = reverseMaybe(obj)
          return obj
        }
      }
      return null
    },
  },
  {
    // 'january 5th 3pm to 4pm'
    match: '[<from>#Date+] (to|until|upto|through|thru|and) [<to>#Time+]',
    desc: 'january from 3pm to 4pm',
    parse: (m, context) => {
      let from = m.groups('from')
      const to = m.groups('to')
      from = parseDate(from, context)
      if (from) {
        const end = from.clone()
        end.applyTime(to.text('implicit'))
        if (end) {
          let obj = {
            start: from,
            end: end,
            unit: 'time',
          }
          if (/(am|pm)/.test(to.text()) === false) {
            obj = moveToPM(obj)
          }
          obj = reverseMaybe(obj)
          return obj
        }
      }
      return null
    },
  },
]
