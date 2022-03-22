import spacetime from 'spacetime'
import Unit from './Unit.js'

class Day extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'day'
    if (this.d.isValid()) {
      this.d = this.d.startOf('day')
    }
  }
  middle() {
    this.d = this.d.time('10am')
    return this
  }
  beforeEnd() {
    this.d = this.d.time('2pm')
    return this
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
    this.unit = 'day'
    this.isWeekDay = true //cool.
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
  // clone() {
  //   return new WeekDay(this.d, this.unit, this.context)
  // }
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
    if (rel === 'next') {
      let tooFar = this.context.today.endOf('week').add(1, 'week')
      this.next()
      //  did we go too-far?
      if (this.d.isAfter(tooFar)) {
        this.last() // go back
      }
      return this
    }
    // the closest-one backwards
    if (rel === 'this-past') {
      return this.last()
    }
    if (rel === 'last') {
      let start = this.context.today.startOf('week')
      this.last()
      // are we still in 'this week' though?
      if (this.d.isBefore(start) === false) {
        this.last() // do it again
      }
      return this
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

export { Day, WeekDay, CalendarDate, Holiday }
