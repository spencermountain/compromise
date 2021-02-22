const parseDate = require('../parseDate/parse')
const parseInterval = require('./intervals')
const ranges = require('./ranges')

// loop thru each range template
const parseRange = function (doc, context) {
  // parse-out 'every week ..'
  let interval = parseInterval(doc, context) || {}
  // try each template in order
  for (let i = 0; i < ranges.length; i += 1) {
    let fmt = ranges[i]
    let m = doc.match(fmt.match)
    if (m.found) {
      if (fmt.group !== undefined) {
        m = m.groups(fmt.group)
      }
      let res = fmt.parse(m, context)
      if (res !== null) {
        // console.log(fmt.match)
        return Object.assign({}, interval, res)
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
    res = {
      start: unit,
      end: unit.clone().end(),
    }
  }
  let combined = Object.assign({}, interval, res)
  return combined
}
module.exports = parseRange
