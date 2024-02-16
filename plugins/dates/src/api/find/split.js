// chop things up into bite-size pieces
const split = function (dates) {
  let m = null
  // don't split anything if it looks like a range
  if (dates.has('^(between|within) #Date')) {
    return dates
  }

  if (dates.has('#Month')) {
    // 'june 5, june 10'
    m = dates.match('[#Month #Value] and? #Month', 0).ifNo('@hasDash$')
    if (m.found) {
      dates = dates.splitAfter(m)
    }

    // '5 june, 10 june'
    m = dates.match('[#Value #Month] and? #Value #Month', 0)
    if (m.found) {
      dates = dates.splitAfter(m)
    }

    // 'june, august'
    m = dates.match('^[#Month] and? #Month #Ordinal?$', 0)
    if (m.found) {
      dates = dates.splitAfter(m)
    }

    // 'june 5th, june 10th'
    m = dates.match('[#Month #Value] #Month', 0).ifNo('@hasDash$')
    if (m.found) {
      dates = dates.splitAfter(m)
    }
  }

  if (dates.has('#WeekDay')) {
    // 'tuesday, wednesday'
    m = dates.match('^[#WeekDay] and? #WeekDay$', 0).ifNo('@hasDash$')
    if (m.found) {
      dates = dates.splitAfter(m)
    }

    // 'tuesday, wednesday, and friday'
    m = dates.match('#WeekDay #WeekDay and? #WeekDay')
    if (m.found) {
      dates = dates.splitOn('#WeekDay')
    }

    // monday, wednesday
    m = dates.match('[#WeekDay] (and|or|this|next)? #WeekDay', 0).ifNo('@hasDash$')
    if (m.found) {
      dates = dates.splitAfter('#WeekDay')
    }
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
  //1998 and 1999
  m = dates.match('#Year [and] #Year', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
  }
  // cleanup any splits
  dates = dates.not('^and')
  dates = dates.not('and$')
  return dates
}
export default split
