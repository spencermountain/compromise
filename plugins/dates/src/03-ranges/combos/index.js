const parseDate = require('../../04-parse')
// const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // jan 5 or 8  - (one month, shared dates)
    match: '^#Month #Value+ (or|and)? #Value$',
    desc: 'jan 5 or 8',
    parse: (m, context) => {
      m = m.not('(or|and)')
      let before = m.match('^#Month #Value')
      let start = parseDate(before, context)
      if (start) {
        let result = [
          {
            start: start,
            end: start.clone().end(),
            unit: start.unit,
          },
        ]
        // add more run-on numbers?
        let more = m.not(before)
        if (more.found) {
          more.match('#Value').forEach((v) => {
            let s = start.clone()
            s.d = s.d.date(v.text('reduced'))
            result.push({
              start: s,
              end: s.clone().end(),
              unit: s.unit,
            })
          })
        }
        return result
      }
      return null
    },
  },

  {
    // 'A or B'
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
