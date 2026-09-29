import parseRange from './range/index.js'
import spacetime from 'spacetime'
import normalize from './normalize.js'



const parse = function (doc, context) {
  // normalize context
  context ||= {}
  if (context.timezone === false) {
    context.timezone = 'UTC'
  }
  // the implied duration of 'after june 2nd'
  context.punt ||= { weeks: 2 }
  context.today ||= spacetime.now(context.timezone)
  context.today = spacetime(context.today, context.timezone)

  doc = normalize(doc)

  const res = parseRange(doc, context)
  return res
}
export default parse
