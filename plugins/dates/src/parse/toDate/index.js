const { Unit } = require('./units')
const parseShift = require('./tokenize/01-shift')
const parseTime = require('./tokenize/02-time')
const parseRelative = require('./tokenize/03-relative')
const namedUnit = require('./01-namedUnit')
// const parseHoliday = require('./02-getUnit/02-holidays')

const parseDate = function(doc) {
  let shift = parseShift(doc)
  let time = parseTime(doc)
  let rel = parseRelative(doc)
  let str = doc.text('reduced')
  console.log(str, '  -  ', rel, '  -  ', shift, '  -  ', time)

  let d = namedUnit(doc)

  // 'this month'

  // let rel = doc.match('^this? [(next|last|previous|current|this)]')
  // doc.remove('^this? (next|last|previous|current|this)')

  // d = d || parseHoliday(doc)

  if (!d) {
    d = new Unit(str)
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
