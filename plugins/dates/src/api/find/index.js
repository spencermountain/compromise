import split from './split.js'

const findDate = function (doc) {
  let dates = doc.match('#Date+')
  // ignore only-durations like '20 minutes'
  dates = dates.filter(m => {
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
  // tokenize the dates
  dates = split(dates)

  // $5 an hour
  dates = dates.notIf('(#Money|#Percentage)')
  dates = dates.notIf('^per #Duration')
  return dates
}
export default findDate
