import { Holiday } from '../units/index.js'
import spacetimeHoliday from 'spacetime-holiday'

const parseHoliday = function (doc, context) {
  let unit = null
  const m = doc.match('[<holiday>#Holiday+] [<year>#Year?]')
  if (!m.found) {
    return null
  }
  let year = context.today.year()
  const hasYear = m.groups('year').found
  if (hasYear) {
    year = Number(m.groups('year').text('reduced')) || year
  }
  const str = m.groups('holiday').text('reduced')
  let s = spacetimeHoliday(str, year, context.timezone)
  if (s !== null) {
    // no explicit year given - assume the holiday is in the future
    if (!hasYear && s.isBefore(context.today.startOf('day'))) {
      s = spacetimeHoliday(str, year + 1, context.timezone)
    }
    unit = new Holiday(s, null, context)
  }
  return unit
}
export default parseHoliday
