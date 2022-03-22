import { Day, Moment } from '../units/index.js'

const knownWord = {
  today: (context) => {
    return new Day(context.today, null, context)
  },
  yesterday: (context) => {
    return new Day(context.today.minus(1, 'day'), null, context)
  },
  tomorrow: (context) => {
    return new Day(context.today.plus(1, 'day'), null, context)
  },
  eom: (context) => {
    let d = context.today.endOf('month')
    d = d.startOf('day')
    return new Day(d, null, context)
  },
  // eod: (context) => {
  //   let d = context.today.endOf('day')
  //   d = d.startOf('hour').minus(4, 'hours') //rough
  //   return new Hour(d, null, context)
  // },
  eoy: (context) => {
    let d = context.today.endOf('year')
    d = d.startOf('day')
    return new Day(d, null, context)
  },
  now: (context) => {
    return new Moment(context.today, null, context) // should we set the current hour?
  },
}
knownWord.tommorrow = knownWord.tomorrow
knownWord.tmrw = knownWord.tomorrow
knownWord.anytime = knownWord.today
knownWord.sometime = knownWord.today

const today = function (doc, context, parts) {
  let unit = null
  // is it empty?
  if (doc.found === false) {
    // do we have just a time?
    if (parts.time !== null) {
      unit = new Moment(context.today, null, context) // choose today
    }
    //do we just have a shift?
    if (parts.shift && Object.keys(parts.shift).length > 0) {
      if (parts.shift.hour || parts.shift.minute) {
        unit = new Moment(context.today, null, context) // choose now
      } else {
        unit = new Day(context.today, null, context) // choose today
      }
    }
  }
  // today, yesterday, tomorrow
  let str = doc.text('reduced')
  if (knownWord.hasOwnProperty(str) === true) {
    return knownWord[str](context)
  }
  // day after next
  if (str === 'next' && parts.shift && Object.keys(parts.shift).length > 0) {
    return knownWord.tomorrow(context)
  }
  return unit
}
export default today
