import { WeekDay, Moment, Day } from './units/index.js'
import doShift from './01-tokenize/01-shift.js'
import doCounter from './01-tokenize/02-counter.js'
import doTime from './01-tokenize/03-time.js'
import doRelative from './01-tokenize/04-relative.js'
import doSection from './01-tokenize/05-section.js'
import doTimezone from './01-tokenize/06-timezone.js'
import doWeekday from './01-tokenize/07-weekday.js'

import today from './02-parse/01-today.js'
import holiday from './02-parse/02-holidays.js'
import nextLast from './02-parse/03-next-last.js'
import yearly from './02-parse/04-yearly.js'
import explicit from './02-parse/05-explicit.js'

import addCounter from './03-transform/addCounter.js'
import spacetime from 'spacetime'

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
  let shift = doShift(doc)
  let counter = doCounter(doc)
  let tz = doTimezone(doc)
  let time = doTime(doc, context)
  let weekDay = doWeekday(doc, context)
  let section = doSection(doc, context)
  let rel = doRelative(doc)

  //set our new timezone
  if (tz) {
    context = Object.assign({}, context, { timezone: tz })
    let iso = context.today.format('iso-short')
    context.today = context.today.goto(context.timezone).set(iso)
  }
  let unit = null
  //'in two days'
  unit = unit || today(doc, context, { shift, time, rel })
  // 'this haloween'
  unit = unit || holiday(doc, context)
  // 'this month'
  unit = unit || nextLast(doc, context)
  // 'q2 2002'
  unit = unit || yearly(doc, context)
  // 'this june 2nd'
  unit = unit || explicit(doc, context)

  if (!unit && weekDay) {
    unit = new WeekDay(weekDay, null, context)
    weekDay = null
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
  if (shift) {
    unit.applyShift(shift)
    // allow shift to change our unit size
    if (shift.hour || shift.minute) {
      unit = new Moment(unit.d, null, unit.context)
    } else if (shift.week || shift.day || shift.month) {
      unit = new Day(unit.d, null, unit.context)
    }
  }
  // wednesday next week
  if (weekDay && unit.unit !== 'day') {
    unit.applyWeekDay(weekDay)
    unit = new WeekDay(unit.d, null, unit.context)
  }
  // this/next/last
  if (rel) {
    unit.applyRel(rel)
  }
  // end of
  if (section) {
    unit.applySection(section)
  }
  // at 5:40pm
  if (time) {
    unit.applyTime(time)
    // unit = new Minute(unit.d, null, unit.context)
  }
  // apply counter
  if (counter && counter.unit) {
    unit = addCounter(unit, counter)
  }
  return unit
}
export default parseDate
