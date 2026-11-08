// import spacetime from 'spacetime'
import tokenize from './01-tokenize/index.js'
import parse from './02-parse/index.js'
import transform from './03-transform/index.js'
import { isDebug } from '../../../_debug.js'

const log = parts => {
  if (isDebug()) {
    // console.log(parts)// eslint-disable-line
    console.log(`\n==== '${parts.doc.text()}' =====`) // eslint-disable-line
    Object.keys(parts).forEach(k => {
      if (k !== 'doc' && parts[k]) {
        console.log(k, parts[k]) // eslint-disable-line
      }
    })
    parts.doc.debug() // allow
  }
}

const parseDate = function (doc, context) {
  //parse-out any sections
  const parts = tokenize(doc, context)
  doc = parts.doc
  // logger
  log(parts)
  // 'tomorrow at 25:00' is not a date
  if (parts.invalid) {
    return null
  }

  //apply our given timezone
  if (parts.tz) {
    context = { ...context, timezone: parts.tz }
    // move 'today' to the same wall-clock date + time in the new zone
    const iso = context.today.format('iso-short')
    const time = context.today.format('time-24')
    context.today = context.today.goto(context.timezone).set(iso).time(time)
  }
  // decide on a root date object
  let unit = parse(doc, context, parts)
  // ISO offsets identify the instant; an explicit named zone retains DST rules.
  if (unit && parts.tz) {
    unit.d = unit.d.goto(parts.tz)
  }
  // apply all our parts
  unit = transform(unit, context, parts)
  return unit
}
export default parseDate
