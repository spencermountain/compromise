const parseDate = require('../04-parse')
const repeating = require('./intervals')
const ranges = [].concat(
  require('./01-two-times'),
  require('./combos'),
  require('./02-date-range'),
  require('./03-one-date')
)

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
  return res
}

const tryRanges = function (doc, context) {
  // try each template in order
  for (let i = 0; i < ranges.length; i += 1) {
    let fmt = ranges[i]
    let m = doc.match(fmt.match)
    if (m.found) {
      if (doc.world.isVerbose() === 'date') {
        console.log(`  ---[${fmt.desc}]---`)
      }
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
const parseRanges = function (doc, context) {
  // parse-out 'every week ..'
  let repeats = repeating(doc, context) || {}
  // try picking-apart ranges
  let found = tryRanges(doc, context)
  if (!found) {
    found = [tryFull(doc, context)]
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
module.exports = parseRanges
