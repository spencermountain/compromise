const parseDate = require('../03-parse')
const repeating = require('./00-repeats')
const ranges = [].concat(require('./01-two-times'), require('./02-two-date'), require('./03-one-date'))

// loop thru each range template
const parseRange = function (doc, context) {
  // parse-out 'every week ..'
  let repeats = repeating(doc, context) || {}
  // if it's *only* an interval response
  if (doc.found === false) {
    return Object.assign({}, repeats, { start: null, end: null })
  }
  // try each template in order
  for (let i = 0; i < ranges.length; i += 1) {
    let fmt = ranges[i]
    let m = doc.match(fmt.match)
    if (m.found) {
      if (fmt.group !== undefined) {
        m = m.groups(fmt.group)
      }
      if (doc.world.isVerbose() === 'date') {
        console.log(`  ---[${fmt.desc}]---`)
      }
      let res = fmt.parse(m, context)
      if (res !== null) {
        return Object.assign({}, repeats, res)
      }
    }
  }
  //else, try whole thing
  let res = {
    start: null,
    end: null,
  }
  let unit = parseDate(doc, context)
  if (unit) {
    if (doc.world.isVerbose() === 'date') {
      console.log(`  --[no-range]--`)
    }
    let end = unit.clone().end()
    res = {
      start: unit,
      end: end,
      unit: unit.setTime ? 'time' : unit.unit,
    }
  }
  let combined = Object.assign({}, repeats, res)
  // ensure start is not after end
  // console.log(combined)
  if (combined.start && combined.end && combined.start.d.epoch > combined.end.d.epoch) {
    // console.warn('Warning: Start date is after End date')
    combined.start = combined.start.start()
    // combined.end = combined.start.clone()
  }

  return combined
}
module.exports = parseRange
