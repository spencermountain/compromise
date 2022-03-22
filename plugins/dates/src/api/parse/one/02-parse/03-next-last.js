import { Week, WeekEnd, AnyMonth, AnyQuarter, Year, Season, WeekDay, Day, Hour, Minute, Moment } from '../units/index.js'
const mapping = {
  day: Day,
  hour: Hour,
  evening: Hour,
  second: Moment,
  milliscond: Moment,
  instant: Moment,
  minute: Minute,
  week: Week,
  weekend: WeekEnd,
  month: AnyMonth,
  quarter: AnyQuarter,
  year: Year,
  season: Season,
  // set aliases
  yr: Year,
  qtr: AnyQuarter,
  wk: Week,
  sec: Moment,
  hr: Hour,
}

let matchStr = `^(${Object.keys(mapping).join('|')})$`

// when a unit of time is spoken of as 'this month' - instead of 'february'
const nextLast = function (doc, context) {
  //this month, last quarter, next year
  let m = doc.match(matchStr)
  if (m.found === true) {
    let str = m.text('reduced')
    if (mapping.hasOwnProperty(str)) {
      let Model = mapping[str]
      if (!Model) {
        return null
      }
      let unit = new Model(null, str, context)
      return unit
    }
  }
  //'next friday, last thursday'
  m = doc.match('^#WeekDay$')
  if (m.found === true) {
    let str = m.text('reduced')
    let unit = new WeekDay(str, null, context)
    return unit
  }

  // tuesday next week
  // m = doc.match('^#WeekDay (this|next)')
  // if (m.found === true) {
  //   let str = m.text('reduced')
  //   let unit = new WeekDay(str, null, context)
  //   return unit
  // }
  return null
}
export default nextLast
