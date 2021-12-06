import { Holiday } from '../units/index.js'
import spacetimeHoliday from 'spacetime-holiday'

const parseHoliday = function (doc, context) {
  let unit = null
  let m = doc.match('[<holiday>#Holiday+] [<year>#Year?]')
  let year = context.today.year()
  if (m.groups('year').found) {
    year = Number(m.groups('year').text('reduced')) || year
  }
  let str = m.groups('holiday').text('reduced')
  let s = spacetimeHoliday(str, year, context.timezone)
  if (s !== null) {
    // assume the year in the future..
    if (s.isBefore(context.today) && year === context.today.year()) {
      s = spacetimeHoliday(str, year + 1, context.timezone)
    }
    unit = new Holiday(s, null, context)
  }
  return unit
}
export default parseHoliday
