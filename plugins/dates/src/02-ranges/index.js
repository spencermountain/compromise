const parseDate = require('../parseDate/parse')
const ranges = require('./ranges')

// loop thru each range template
const parseRange = function (doc, context) {
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
        return res
      }
    }
  }
  //else, try whole thing
  let unit = parseDate(doc, context)
  if (unit) {
    return {
      start: unit,
      end: unit.clone().end(),
    }
  }
  return {
    start: null,
    end: null,
  }
}
module.exports = parseRange
