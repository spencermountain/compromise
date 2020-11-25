const { Unit } = require('../units')

const impliedToday = function (doc, context, section) {
  let unit = null
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
  return unit
}
module.exports = impliedToday
