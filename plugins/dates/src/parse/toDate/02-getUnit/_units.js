const spacetime = require('spacetime')

class Unit {
  constructor(str, unit) {
    this.str = str
    this.unit = unit || 'day'

    // set it to the beginning of the given unit
    let d = spacetime(str)
    d = d.startOf(unit)
    Object.defineProperty(this, 'd', {
      enumerable: false,
      writable: true,
      value: d,
    })
  }
  // make a new one
  clone() {
    let d = new Unit(this.str)
    d.unit = this.unit
    return d
  }
  applyShift(obj) {
    Object.keys(obj).forEach(k => {
      this.d = this.d.add(obj[k], k)
    })
    return this
  }
  applyTime(str) {
    if (str) {
      this.d = this.d.time(str)
    } else {
      this.d = this.d.startOf('day') //zero-out time
    }
    return this
  }
  format(fmt) {
    return this.d.format(fmt)
  }
  start() {
    this.d = this.d.startOf(this.unit)
    return this
  }
  end() {
    this.d = this.d.endOf(this.unit)
    return this
  }
  // 'before 2019'
  before() {
    this.d = spacetime.now() // ???
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
class Day extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'day'
  }
}
class Month extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'month'
  }
}
class Quarter extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'quarter'
  }
}
class Year extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'year'
  }
}
class WeekDay extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'week'
    this.d = this.d.day(str)
  }
  next() {
    this.d = this.d.add(7, 'days')
    this.d = this.d.day(this.str)
    return this
  }
  last() {
    this.d = this.d.minus(7, 'days')
    this.d = this.d.day(this.str)
    return this
  }
}
// like 'feb 2'
class CalendarDate extends Unit {
  constructor(str, unit) {
    super(str, unit)
    this.unit = 'day'
  }
  next() {
    this.d = this.d.add(1, 'year')
    return this
  }
  last() {
    this.d = this.d.minus(1, 'year')
    return this
  }
}
module.exports = {
  Unit: Unit,
  Day: Day,
  Month: Month,
  Quarter: Quarter,
  Year: Year,
  WeekDay: WeekDay,
  CalendarDate: CalendarDate,
}
