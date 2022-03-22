import addCounter from './addCounter.js'
import { WeekDay, Moment, Day } from '../units/index.js'

// apply all parsed {parts} to our unit date
const transform = function (unit, context, parts) {

  if (!unit && parts.weekDay) {
    unit = new WeekDay(parts.weekDay, null, context)
    parts.weekDay = null
  }

  // just don't bother
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
export default transform