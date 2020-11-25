const { Unit, Day } = require('../units')

const knownWord = {
  today: (context) => {
    return new Day(context.today, null, context)
  },
  yesterday: (context) => {
    return new Day(context.today.minus(1, 'day'), null, context)
  },
  tomorrow: (context) => {
    return new Day(context.today.plus(1, 'day'), null, context)
  },
}
knownWord.tommorrow = knownWord.tomorrow

const today = function (doc, context, section) {
  let unit = null
  // is it empty?
  if (doc.found === false) {
    // do we have just a time?
    if (section.time !== null) {
      unit = new Unit(context.today, null, context) // choose today
    }
    //do we just have a shift?
    if (Object.keys(section.shift).length > 0) {
      unit = new Unit(context.today, null, context) // choose today
    }
  }

  // today, yesterday, tomorrow
  let str = doc.text('reduced')
  if (knownWord.hasOwnProperty(str) === true) {
    return knownWord[str](context)
  }
  // day after next
  if (str === 'next' && Object.keys(section.shift).length > 0) {
    return knownWord.tomorrow(context)
  }
  return unit
}
module.exports = today
