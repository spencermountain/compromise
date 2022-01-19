import today from './01-today.js'
import holiday from './02-holidays.js'
import nextLast from './03-next-last.js'
import yearly from './04-yearly.js'
import explicit from './05-explicit.js'

const parse = function (doc, context, parts) {
  let unit = null
  //'in two days'
  unit = unit || today(doc, context, parts)
  // 'this haloween'
  unit = unit || holiday(doc, context)
  // 'this month'
  unit = unit || nextLast(doc, context)
  // 'q2 2002'
  unit = unit || yearly(doc, context)
  // 'this june 2nd'
  unit = unit || explicit(doc, context)

  return unit
}
export default parse