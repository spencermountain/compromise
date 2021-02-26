const findDate = function (doc) {
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
  m = dates.match('^[#WeekDay] #WeekDay$', 0)
  if (m.found) {
    dates = dates.splitAfter(m)
    dates = dates.not('^(and|or)')
  }
  // 'tuesday, wednesday, and friday'
  m = dates.match('#WeekDay #WeekDay and #WeekDay')
  if (m.found) {
    dates = dates.splitOn('#WeekDay')
    dates = dates.not('^(and|or)')
  }
  // // 'january, february'
  // m = dates.match('^[#Month] (and|or)? #Month$', 0)
  // if (m.found) {
  //   dates = dates.splitAfter(m)
  //   dates = dates.not('^(and|or)')
  // }

  return dates
}
module.exports = findDate
