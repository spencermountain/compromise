const parseShift = require('./sections/01-shift')
const parseTime = require('./sections/02-time')
const parseRelative = require('./sections/03-relative')

const namedUnit = require('./steps/01-namedUnit')
const parseHoliday = require('./steps/02-holidays')
const explicit = require('./steps/03-explicit')
const { Unit } = require('./_units')

const parseDate = function(doc, context) {
  //parse-out any sections
  let shift = parseShift(doc)
  let time = parseTime(doc, context)
  let rel = parseRelative(doc)
  let d = null

  if (doc.found === false) {
    // do we have just a time?
    if (time !== null) {
      d = new Unit(context.today, null, context) // choose today
    }
    //do we just have a shift?
    if (Object.keys(shift).length > 0) {
      d = new Unit(context.today, null, context) // choose today
    }
  }

  // this month
  d = d || namedUnit(doc, context)
  // this haloween
  d = d || parseHoliday(doc, context)
  // this june 2nd
  d = d || explicit(doc, context)
  if (!d) {
    return null
  }

  // // apply relative
  if (rel === 'last') {
    d.last()
  }
  if (rel === 'next') {
    d.next()
  }
  // apply shift
  if (shift) {
    d.applyShift(shift)
  }

  // apply time
  d.applyTime(time)

  return d
}
module.exports = parseDate
