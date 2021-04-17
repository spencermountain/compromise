const findDate = function (doc) {
  // doc.debug()
  // let r = this.clauses()
  let dates = doc.match('#Date+')
  // ignore only-durations like '20 minutes'
  dates = dates.filter((m) => {
    let isDuration = m.has('^#Duration+$') || m.has('^#Value #Duration+$')
    // allow 'q4', etc
    if (isDuration === true && m.has('(#FinancialQuarter|quarter)')) {
      return true
    }
    return isDuration === false
  })
  // 30 minutes on tuesday
  let m = dates.match('[#Cardinal #Duration (in|on|this|next|during|for)] #Date', 0)
  if (m.found) {
    dates = dates.not(m)
  }
  // 30 minutes tuesday
  m = dates.match('[#Cardinal #Duration] #WeekDay', 0)
  if (m.found) {
    dates = dates.not(m)
  }
  // tuesday for 30 mins
  m = dates.match('#Date [for #Value #Duration]$', 0)
  if (m.found) {
    dates = dates.not(m)
  }
  // 'tuesday, wednesday'
  m = dates.match('^[#WeekDay] and? #WeekDay$', 0)
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
  // '20 minutes june 5th'
  m = dates.match('[#Cardinal #Duration] #Date', 0) //but allow '20 minutes ago'
  if (m.found && !dates.has('#Cardinal #Duration] (ago|from|before|after|back)')) {
    dates = dates.not(m)
  }
  // for 20 minutes
  m = dates.match('for #Cardinal #Duration')
  if (m.found) {
    dates = dates.not(m)
  }
  // 'one saturday'
  dates = dates.notIf('^one (#WeekDay|#Month)$')

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
  m = dates.match('[(today|tomorrow|yesterday)] (today|tomorrow|yesterday)', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
  }
  return dates
}
module.exports = findDate
