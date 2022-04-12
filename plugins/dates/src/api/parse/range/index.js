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
  let unit = parseDate(doc, context)
  if (unit) {
    let end = unit.clone().end()
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
    let fmt = ranges[i]
    let m = doc.match(fmt.match)
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

// loop thru each range template
const parseRanges = function (m, context) {
  // parse-out 'every week ..'
  let repeats = repeating(m, context) || {}
  // try picking-apart ranges
  let found = tryRanges(m, context)
  if (!found) {
    found = [tryFull(m, context)]
  }
  // add the repeat info to each date
  found = found.map((o) => Object.assign({}, repeats, o))
  // ensure start is not after end
  found.forEach((res) => {
    if (res.start && res.end && res.start.d.epoch > res.end.d.epoch) {
      res.start = res.start.start()
    }
  })
  return found
}
export default parseRanges
