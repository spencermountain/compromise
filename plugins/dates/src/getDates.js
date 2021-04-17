const spacetime = require('spacetime')
const parseRanges = require('./03-ranges')
const normalize = require('./normalize')
const generate = require('./generate')

const toISO = function (unit) {
  if (unit && unit.d) {
    return unit.d.format('iso')
  }
  return null
}

const getDate = function (doc, context) {
  // validate context a bit
  context = context || {}
  context.today = spacetime(context.today || null, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)

  //interpret 'between [A] and [B]'...
  let result = parseRanges(doc, context)
  // format as iso
  result.start = toISO(result.start)
  result.end = toISO(result.end)
  // generate interval dates
  if (result.repeat) {
    result = generate(result, context)
  }
  // add timezone
  result.tz = context.timezone

  return result
}
module.exports = getDate
