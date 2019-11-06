const { Unit } = require('./units')
const parseShift = require('./01-parse-shift')

const parseDate = function(doc) {
  let shift = parseShift(doc)
  let str = doc.text('reduced')
  let d = new Unit(str)
  d.unit = 'month'

  d.applyShift(shift)

  return d
}
module.exports = parseDate
