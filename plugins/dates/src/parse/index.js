const normalize = require('./01-normalize')
const spacetime = require('spacetime')
const parseRanges = require('./02-parse-range')

const parse = function(doc, context) {
  // validate context a bit
  context = context || {}

  context.timezone = context.timezone || 'ETC/UTC'
  context.today = spacetime(context.today, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)
  //interpret 'between [A] and [B]'...
  return parseRanges(doc, context)
}
module.exports = parse
