import spacetime from 'spacetime'

class Unit {
  constructor(input, unit, context) {
    this.unit = unit || 'day'
    this.setTime = false
    context = context || {}
    let today = {}
    if (context.today) {
      today = {
        date: context.today.date(),
        month: context.today.month(),
        year: context.today.year(),
      }
    }
    if (input && input.month === 'sept') {
      input.month = 'sep'
    }
    // set it to the beginning of the given unit
    let d = spacetime(input, context.timezone, { today: today, dmy: context.dmy })
    Object.defineProperty(this, 'd', {
      enumerable: false,
      writable: true,
      value: d,
    })
    Object.defineProperty(this, 'context', {
      enumerable: false,
      writable: true,
      value: context,
    })
  }
  // make a new one
  clone() {
    let d = new Unit(this.d, this.unit, this.context)
    d.setTime = this.setTime
    return d
  }
  log() {
    console.log('--')//eslint-disable-line
    this.d.log()
    console.log('\n')//eslint-disable-line
    return this
  }
  applyShift(obj = {}) {
    Object.keys(obj).forEach((unit) => {
      this.d = this.d.add(obj[unit], unit)
      if (unit === 'hour' || unit === 'minute') {
        this.setTime = true
      }
    })
    return this
  }
  applyTime(str) {
    if (str) {
      let justHour = /^[0-9]{1,2}$/
      if (justHour.test(str)) {
        this.d = this.d.hour(str)
      } else {
        this.d = this.d.time(str)
      }
      // wiggle the best am/pm
      let amPM = /[ap]m/.test(str)
      if (!amPM) {
        let tooEarly = this.d.time('6:00am')
        if (this.d.isBefore(tooEarly)) {
          this.d = this.d.ampm('pm')
        }
        let tooLate = this.d.time('10:00pm')
        if (this.d.isAfter(tooLate)) {
          this.d = this.d.ampm('am')
        }
      }
    } else {
      this.d = this.d.startOf('day') //zero-out time
    }
    this.setTime = true
    return this
  }
  applyWeekDay(day) {
    if (day) {
      let epoch = this.d.epoch
      this.d = this.d.day(day)
      if (this.d.epoch < epoch) {
        this.d = this.d.add(1, 'week')
      }
    }
    return this
  }
  applyRel(rel) {
    if (rel === 'next') {
      return this.next()
    }
    if (rel === 'last' || rel === 'this-past') {
      // special 'this past' logic is handled in WeekDay
      return this.last()
    }
    return this
  }
  applySection(section) {
    if (section === 'start') {
      return this.start()
    }
    if (section === 'end') {
      return this.end()
    }
    if (section === 'middle') {
      return this.middle()
    }
    return this
  }
  format(fmt) {
    return this.d.format(fmt)
  }
  start() {
    this.d = this.d.startOf(this.unit)
    // do we have a custom day-start?
    if (this.context.dayStart) {
      this.d = this.d.time(this.context.dayStart)
    }
    return this
  }
  end() {
    // do we have a custom day-end?
    this.d = this.d.endOf(this.unit)
    if (this.context.dayEnd) {
      this.d = this.d.startOf('day')
      let dayEnd = this.d.time(this.context.dayEnd)
      if (dayEnd.isAfter(this.d)) {
        this.d = dayEnd
        return this
      }
    }
    return this
  }
  middle() {
    let diff = this.d.diff(this.d.endOf(this.unit))
    let minutes = Math.round(diff.minutes / 2)
    this.d = this.d.add(minutes, 'minutes')
    return this
  }
  // move it to 3/4s through
  beforeEnd() {
    let diff = this.d.startOf(this.unit).diff(this.d.endOf(this.unit))
    let mins = Math.round(diff.minutes / 4)
    this.d = this.d.endOf(this.unit)
    this.d = this.d.minus(mins, 'minutes')
    if (this.context.dayStart) {
      this.d = this.d.time(this.context.dayStart)
    }
    return this
  }
  // the millescond before
  before() {
    this.d = this.d.minus(1, this.unit)
    this.d = this.d.endOf(this.unit)
    if (this.context.dayEnd) {
      this.d = this.d.time(this.context.dayEnd)
    }
    return this
  }
  // 'after 2019'
  after() {
    this.d = this.d.add(1, this.unit)
    this.d = this.d.startOf(this.unit)
    return this
  }
  // tricky: 'next june' 'next tuesday'
  next() {
    this.d = this.d.add(1, this.unit)
    this.d = this.d.startOf(this.unit)
    return this
  }
  // tricky: 'last june' 'last tuesday'
  last() {
    this.d = this.d.minus(1, this.unit)
    this.d = this.d.startOf(this.unit)
    return this
  }
}
export default Unit
