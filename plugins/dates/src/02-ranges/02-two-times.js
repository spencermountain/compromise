const parseDate = require('../parseDate/parse')
const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // '3pm to 4pm january 5th'
    match: '^from? [<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
    parse: (m, context) => {
      let time = m.groups('from')
      let to = m.groups('to')
      let end = parseDate(to, context)
      if (end) {
        let start = end.clone()
        start.applyTime(time.text())
        if (start) {
          let obj = {
            start: start,
            end: end,
            unit: 'time',
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
    match: '^from? [<from>.+] (to|until|upto|through|thru|and) [<to>#Time+]',
    parse: (m, context) => {
      let from = m.groups('from')
      let to = m.groups('to')
      from = parseDate(from, context)
      if (from) {
        let end = from.clone()
        end.applyTime(to.text())
        if (end) {
          let obj = {
            start: from,
            end: end,
            unit: 'time',
          }
          obj = reverseMaybe(obj)
          return obj
        }
      }
      return null
    },
  },
]
