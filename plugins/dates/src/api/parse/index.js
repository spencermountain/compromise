import parseRange from './range/index.js'
import spacetime from 'spacetime'


const parse = function (doc, context) {
  // normalize context
  context = context || {}
  if (context.timezone === false) {
    context.timezone = 'UTC'
  }
  context.today = context.today || spacetime.now(context.timezone)
  context.today = spacetime(context.today, context.timezone)

  // normalize doc
  doc = doc.clone()
  doc.numbers().toNumber()

  let res = parseRange(doc, context)
  return res
}
export default parse
