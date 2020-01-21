const parseShift = require('./tokenize/01-shift')
const parseTime = require('./tokenize/02-time')
const parseRelative = require('./tokenize/03-relative')

const namedUnit = require('./01-namedUnit')
const parseHoliday = require('./02-holidays')
const explicit = require('./03-explicit')
const { Unit } = require('./units')

const parseDate = function(doc, context) {
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
