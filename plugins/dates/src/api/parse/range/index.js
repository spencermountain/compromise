import parseDate from '../one/index.js'
import repeating from './intervals/index.js'
// ranges
import doTwoTimes from './01-two-times.js'
import doCombos from './combos/index.js'
import doDateRange from './02-date-range.js'
import doOneDate from './03-one-date.js'

const ranges = [].concat(doTwoTimes, doCombos, doDateRange, doOneDate)

const env = typeof process === 'undefined' || !process.env ? self.env || {} : process.env
const log = msg => {
  if (env.DEBUG_DATE) {
    console.log(`\n  \x1b[32m ${msg} \x1b[0m`) // eslint-disable-line
  }
}

const isArray = function (arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

//else, try whole thing, non ranges
const tryFull = function (doc, context) {
  let res = {
    start: null,
    end: null,
  }
  if (!doc.found) {
    return res
  }
  const unit = parseDate(doc, context)
  if (unit) {
    const end = unit.clone().end()
    res = {
      start: unit,
      end: end,
      unit: unit.setTime ? 'time' : unit.unit,
    }
  }
  return res
}

const tryRanges = function (doc, context) {

  // try each template in order
  for (let i = 0; i < ranges.length; i += 1) {
    const fmt = ranges[i]
    const m = doc.match(fmt.match)
    if (m.found) {
      log(`  ---[${fmt.desc}]---`)
      let res = fmt.parse(m, context)
      if (res !== null) {
        // did it return more than one date?
        if (!isArray(res)) {
          res = [res]
        }
        return res
      }
    }
  }
  return null
}

// 'quarter to five' is a time, not a range
const isClockTime = function (doc) {
  return doc.has('^(at|by|before|around)? (quarter|half|five|ten|fifteen|twenty|5|10|15|20|25) (to|past|after) #Cardinal$')
}

// loop thru each range template
const parseRanges = function (m, context) {
  // parse-out 'every week ..'
  const repeats = repeating(m, context) || {}
  // try picking-apart ranges
  let found = isClockTime(m) ? null : tryRanges(m, context)
  if (!found) {
    found = [tryFull(m, context)]
  }
  // add the repeat info to each date
  found = found.map((o) => Object.assign({}, repeats, o))
  // ensure start is not after end
  found.forEach((res) => {
    if (res.start && res.end && res.start.d.epoch > res.end.d.epoch) {
      const tmp = res.start
      res.start = res.end
      res.end = tmp
    }
  })
  return found
}
export default parseRanges
