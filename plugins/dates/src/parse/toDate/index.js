const parseShift = require('./tokenize/01-shift')
const parseTime = require('./tokenize/02-time')
const parseRelative = require('./tokenize/03-relative')
const namedUnit = require('./01-namedUnit')
const parseHoliday = require('./02-holidays')
const explicit = require('./03-explicit')
const { Unit } = require('./units')

const parseDate = function(doc) {
  let shift = parseShift(doc)
  let time = parseTime(doc)
  let rel = parseRelative(doc)
  let d = null
  // let str = doc.text('reduced')
  // console.log(str, '  -  ', rel, '  -  ', shift, '  -  ', time)

  // do we have just a time?
  if (doc.found === false && time !== null) {
    d = new Unit() // choose today
  }

  // this month
  d = d || namedUnit(doc)
  // this haloween
  d = d || parseHoliday(doc)
  // this june 2nd
  d = d || explicit(doc)

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
