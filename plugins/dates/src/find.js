const spacetime = require('spacetime')
const parseRanges = require('./02-ranges')
const normalize = require('./normalize')

const getDate = function (doc, context) {
  // validate context a bit
  context = context || {}
  context.timezone = context.timezone || 'ETC/UTC'
  context.today = spacetime(context.today || null, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)
  //interpret 'between [A] and [B]'...
  return parseRanges(doc, context)
}
module.exports = getDate
