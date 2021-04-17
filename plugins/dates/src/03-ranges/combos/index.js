const parseDate = require('../../04-parse')
// const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // jan 5 or 8  - (one month, shared dates)
    match: '[<start>#Month #Value+] [<prep>(or|and)] [<end>#Value]',
    desc: 'jan 5 or 8',
    parse: (m, context) => {
      let before = m.groups('start')
      let match = before.match('[<top>#Month #Value] [<more>#Value+?]')
      let start = parseDate(match.groups('top'), context)
      if (start) {
        let result = [
          {
            start: start,
            end: start.clone().end(),
            unit: start.unit,
          },
        ]
        // add more run-on numbers?
        let more = match.groups('more')
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
        // do end-date
        let end = start.clone()
        end.d = end.d.date(m.groups('end').text())
        end = end.start()
        if (end.d.isValid()) {
          result.push({
            start: end,
            end: end.clone().end(),
            unit: end.unit,
          })
          return result
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
