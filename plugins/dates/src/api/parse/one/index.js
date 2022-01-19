import { WeekDay, Moment, Day } from './units/index.js'
import today from './02-parse/01-today.js'
import holiday from './02-parse/02-holidays.js'
import nextLast from './02-parse/03-next-last.js'
import yearly from './02-parse/04-yearly.js'
import explicit from './02-parse/05-explicit.js'
import addCounter from './03-transform/addCounter.js'
import spacetime from 'spacetime'
import tokenize from './01-tokenize/index.js'

const interpret = function (doc, context, parts) {

}

const parseDate = function (doc, context) {
  doc = doc.clone()
  context = context || {}
  if (!context.today) {
    context.today = spacetime.now(context.timezone)
  }
  context.today = spacetime(context.today, context.timezone)
  // quick normalization
  doc.match('[^the] !#Value', 0).remove() // keep 'the 17th'
  //parse-out any sections
  let parts = tokenize(doc, context)
  doc = parts.doc

  //set our new timezone
  if (parts.tz) {
    context = Object.assign({}, context, { timezone: parts.tz })
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
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
  if (!unit && parts.weekDay) {
    unit = new WeekDay(parts.weekDay, null, context)
    parts.weekDay = null
  }

  // debugging
  // if (doc.world.isVerbose() === 'date') {
  // console.log('\n\n=-= - - - - - =-=-')
  // console.log(`     str:   '${doc.text()}'`)
  // console.log(`     shift:      ${JSON.stringify(shift)}`)
  // console.log(`     counter:   `, counter)
  // console.log(`     rel:        ${rel || '-'}`)
  // console.log(`     section:    ${section || '-'}`)
  // console.log(`     time:       ${time || '-'}`)
  // console.log(`     weekDay:    ${weekDay || '-'}`)
  // console.log('     unit:     ', unit)
  // console.log('')
  // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n\n')
  // }
  if (!unit) {
    return null
  }

  // 2 days after..
  if (parts.shift) {
    let shift = parts.shift
    unit.applyShift(shift)
    // allow shift to change our unit size
    if (shift.hour || shift.minute) {
      unit = new Moment(unit.d, null, unit.context)
    } else if (shift.week || shift.day || shift.month) {
      unit = new Day(unit.d, null, unit.context)
    }
  }
  // wednesday next week
  if (parts.weekDay && unit.unit !== 'day') {
    unit.applyWeekDay(parts.weekDay)
    unit = new WeekDay(unit.d, null, unit.context)
  }
  // this/next/last
  if (parts.rel) {
    unit.applyRel(parts.rel)
  }
  // end of
  if (parts.section) {
    unit.applySection(parts.section)
  }
  // at 5:40pm
  if (parts.time) {
    unit.applyTime(parts.time)
    // unit = new Minute(unit.d, null, unit.context)
  }
  // apply counter
  if (parts.counter && parts.counter.unit) {
    unit = addCounter(unit, parts.counter)
  }
  return unit
}
export default parseDate
