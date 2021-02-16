const spacetime = require('spacetime')
const parseRanges = require('./02-ranges')
const normalize = require('./normalize')
const generate = require('./generate')

const addDuration = function (start, end) {
  let duration = {}
  if (start && end) {
    duration = start.d.diff(end.d)
    // we don't need these
    delete duration.milliseconds
    delete duration.seconds
  }
  return duration
}

const toISO = function (unit) {
  if (unit && unit.d) {
    return unit.d.format('iso')
  }
  return null
}

const getDate = function (doc, context) {
  // validate context a bit
  context = context || {}
  context.timezone = context.timezone || 'ETC/UTC'
  context.today = spacetime(context.today || null, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)
  //interpret 'between [A] and [B]'...
  let result = parseRanges(doc, context)
  // add duration
  result.duration = addDuration(result.start, result.end)
  // format as iso
  result.start = toISO(result.start)
  result.end = toISO(result.end)
  // generate interval dates
  if (result.repeat) {
    result = generate(result, context)
  }

  return result
}
module.exports = getDate
