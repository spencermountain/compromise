const parseDate = require('../03-parse')
const reverseMaybe = require('./_reverse')

// const swapAMPM = function (start) {}

module.exports = [
  {
    // '3pm to 4pm january 5th'
    match: '^(between|from)? [<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
    desc: '3pm to 4pm january 5th',
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
    match: '^(from|between)? [<from>.+] (to|until|upto|through|thru|and) [<to>#Time+]',
    desc: 'january from 3pm to 4pm',
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
