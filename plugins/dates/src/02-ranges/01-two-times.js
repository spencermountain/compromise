const parseDate = require('../03-parse')
const reverseMaybe = require('./_reverse')

// const swapAMPM = function (start) {}

module.exports = [
  // {
  //   // 'january from 3pm to 4pm'
  //   match: '^[<date>#Date+] (from|between) [<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+]',
  //   desc: 'tuesday between 3 and 4',
  //   parse: (m, context) => {
  //     let date = m.groups('date')
  //     console.log('=-=-=-= here -=-=-=-')
  //     let from = m.groups('from')
  //     let to = m.groups('to')
  //     from = parseDate(from, context)
  //     if (from) {
  //       let end = from.clone()
  //       end.applyTime(to.text())
  //       if (end) {
  //         let obj = {
  //           start: from,
  //           end: end,
  //           unit: 'time',
  //         }
  //         obj = reverseMaybe(obj)
  //         return obj
  //       }
  //     }
  //     return null
  //   },
  // },
  {
    // '3pm to 4pm january 5th'
    match: '[<from>#Time+] (to|until|upto|through|thru|and) [<to>#Time+ #Date+]',
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
    match: '[<from>#Date+] (to|until|upto|through|thru|and) [<to>#Time+]',
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
