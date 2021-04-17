// chop things up into bite-size pieces
const split = function (dates) {
  // 'tuesday, wednesday'
  let m = dates.match('^[#WeekDay] and? #WeekDay$', 0)
  if (m.found) {
    if (m.first().has('@hasDash') === false) {
      dates = dates.splitAfter(m)
      dates = dates.not('^and')
    }
  }
  // 'june, august'
  m = dates.match('^[#Month] and? #Month #Ordinal?$', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
    dates = dates.not('^and')
  }

  // 'tuesday, wednesday, and friday'
  m = dates.match('#WeekDay #WeekDay and? #WeekDay')
  if (m.found) {
    dates = dates.splitOn('#WeekDay')
    dates = dates.not('^and')
  }
  // monday, wednesday
  m = dates.match('[#WeekDay] #WeekDay', 0).ifNo('@hasDash$')
  if (m.found) {
    dates = dates.splitAfter('#WeekDay')
    dates = dates.not('^and')
  }
  // '5 june, 10 june'
  m = dates.match('[#Value #Month] #Value #Month', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
  }
  // 'june 5th, june 10th'
  m = dates.match('[#Month #Value] #Month', 0).ifNo('@hasDash$')
  if (m.found) {
    dates = dates.splitAfter(m)
  }

  // next week tomorrow
  m = dates.match('(this|next) #Duration [(today|tomorrow|yesterday)]', 0)
  if (m.found) {
    dates = dates.splitBefore(m)
  }
  // tomorrow 15 march
  m = dates.match('[(today|tomorrow|yesterday)] #Value #Month', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
  }
  // tomorrow yesterday
  m = dates.match('[(today|tomorrow|yesterday)] (today|tomorrow|yesterday|#WeekDay)', 0).ifNo('@hasDash$')
  if (m.found) {
    dates = dates.splitAfter(m)
  }
  return dates
}
module.exports = split
