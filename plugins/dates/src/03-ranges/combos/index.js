const parseDate = require('../../04-parse')
// const reverseMaybe = require('./_reverse')

module.exports = [
  {
    // jan 5 or 8
    match: '[<start>#Month #Value] (<prep>or|and) [<end>#Value]',
    desc: 'jan 5 or 8',
    parse: (m, context) => {
      let start = m.groups('start')
      start = parseDate(start, context)
      if (start) {
        let endNum = m.groups('end')
        let end = start.clone()
        end.d = end.d.date(endNum.text())

        // end = end.end()
        return {
          start: start,
          end: end,
        }
      }
      return null
    },
  },
]
