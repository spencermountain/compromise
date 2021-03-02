const spacetime = require('spacetime')
const Unit = require('./Unit')

class Day extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
    if (this.d.isValid()) {
      this.d = this.d.startOf('day')
    }
  }
}

// like 'feb 2'
class CalendarDate extends Day {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
    if (this.d.isValid()) {
      this.d = this.d.startOf('day')
    }
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

class WeekDay extends Day {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
    // is the input just a weekday?
    if (typeof input === 'string') {
      this.d = spacetime(context.today, context.timezone)
      this.d = this.d.day(input)
      // assume a wednesday in the future
      if (this.d.isBefore(context.today)) {
        this.d = this.d.add(7, 'days')
      }
    } else {
      this.d = input
    }
    this.weekDay = this.d.dayName()
    if (this.d.isValid()) {
      this.d = this.d.startOf('day')
    }
  }
  clone() {
    //overloaded method
    return new WeekDay(this.d, this.unit, this.context)
  }
  end() {
    //overloaded method
    this.d = this.d.endOf('day')
    if (this.context.dayEnd) {
      this.d = this.d.time(this.context.dayEnd)
    }
    return this
  }
  next() {
    this.d = this.d.add(7, 'days')
    this.d = this.d.day(this.weekDay)
    return this
  }
  last() {
    this.d = this.d.minus(7, 'days')
    this.d = this.d.day(this.weekDay)
    return this
  }
  // the millescond before
  before() {
    this.d = this.d.minus(1, 'day')
    this.d = this.d.endOf('day')
    if (this.context.dayEnd) {
      this.d = this.d.time(this.context.dayEnd)
    }
    return this
  }
  applyRel(rel) {
    // console.log('=-=-=-= here -=-=-=-')
    if (rel === 'next') {
      return this.next()
    }
    if (rel === 'last') {
      return this.last()
    }
    if (rel === 'this-past') {
      return this.last()
    }
    return this
  }
}

// like 'haloween'
class Holiday extends CalendarDate {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
    if (this.d.isValid()) {
      this.d = this.d.startOf('day')
    }
  }
}

module.exports = {
  Day: Day,
  WeekDay: WeekDay,
  CalendarDate: CalendarDate,
  Holiday: Holiday,
}
