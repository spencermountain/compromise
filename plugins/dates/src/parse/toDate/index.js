const { Unit } = require('./units')
const parseShift = require('./01-parse-shift')
const parseRelative = require('./02-parse-relative')
const parseHoliday = require('./03-parse-holiday')

const parseDate = function(doc) {
  let shift = parseShift(doc)

  let d = parseRelative(doc)

  d = d || parseHoliday(doc)

  if (!d) {
    let str = doc.text('reduced')
    d = new Unit(str)
  }

  d.applyShift(shift)

  return d
}
module.exports = parseDate
