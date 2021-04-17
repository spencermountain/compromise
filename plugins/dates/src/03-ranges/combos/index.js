const parseDate = require('../../04-parse')
// const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // jan 5 or 8  - (one month, shared dates)
    match: '[<start>#Month #Value] [<prep>(or|and)] [<end>#Value]',
    desc: 'jan 5 or 8',
    parse: (m, context) => {
      let start = m.groups('start')
      start = parseDate(start, context)
      if (start) {
        let end = start.clone()
        end.d = end.d.date(m.groups('end').text())
        end = end.start()
        if (end.d.isValid()) {
          return [
            {
              start: start,
              end: start.clone().end(),
              unit: start.unit,
            },
            {
              start: end,
              end: end.clone().end(),
              unit: end.unit,
            },
          ]
        }
      }
      return null
    },
  },

  {
    // 'from A to B'
    match: '^!(between|from)? [<from>#Date+] (and|or) [<to>#Date+]$',
    desc: 'A or B',
    parse: (m, context) => {
      let from = m.groups('from')
      let to = m.groups('to')
      from = parseDate(from, context)
      to = parseDate(to, context)
      if (from && to) {
        return [
          {
            start: from,
            end: from.clone().end(),
          },
          {
            start: to,
            end: to.clone().end(),
          },
        ]
      }
      return null
    },
  },
]
