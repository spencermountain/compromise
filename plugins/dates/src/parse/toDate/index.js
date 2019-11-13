// const { Unit } = require('./02-getUnit/_units')
const parseShift = require('./01-parse/01-shift')
const parseTime = require('./01-parse/02-time')
const parseRelative = require('./01-parse/03-relative')
// const parseRelative = require('./01-parse/03-relative')
// const parseHoliday = require('./02-getUnit/02-holidays')

const parseDate = function(doc) {
  let shift = parseShift(doc)
  let time = parseTime(doc)
  // doc.debug()
  // time.debug()

  // 'this month'
  // let d = parseRelative(doc)

  // let rel = doc.match('^this? [(next|last|previous|current|this)]')
  // doc.remove('^this? (next|last|previous|current|this)')

  // d = d || parseHoliday(doc)

  // if (!d) {
  //   let str = doc.text('reduced')
  //   d = new Unit(str)
  // }

  // // apply relative
  // if (rel.has('(last|previous)')) {
  //   d.last()
  // } else if (rel.has('next')) {
  //   d.next()
  // }
  // // apply shift
  // d.applyShift(shift)

  return null
}
module.exports = parseDate
