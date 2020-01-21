const { Unit, Day, CalendarDate } = require('./units')

const knownWord = {
  today: context => new Day(context.today, null, context),
  yesterday: context => {
    new Day(context.today.minus(1, 'day'), null, context)
  },
  tomorrow: context => {
    new Day(context.today.plus(1, 'day'), null, context)
  },
}

// parse things like 'june 5th 2019'
const parseExplicit = function(doc, context) {
  // 'fifth of june'
  if (doc.has('#Value of #Month')) {
    let obj = {
      month: doc.match('#Month').text(),
      date: doc.match('[#Value] of #Month').text(),
      year: context.today.year(),
    }
    let d = new CalendarDate(obj, null, context)
    if (d.d.isValid() === true) {
      return d
    }
  }

  let str = doc.text('reduced')
  // today, yesterday, tomorrow
  if (knownWord.hasOwnProperty(str) === true) {
    let d = knownWord[str](context)
    return d
  }

  // punt it to spacetime, for the heavy-lifting
  let d = new Unit(str, null, context)
  // console.log(context.d.format('nice-year'))
  // did we find a date?
  if (d.d.isValid() === false) {
    return null
  }
  return d
}
module.exports = parseExplicit
