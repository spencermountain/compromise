const parseDate = require('../../04-parse')
// const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // jan 5 or 8
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
]
