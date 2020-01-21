const spacetime = require('spacetime')
const Unit = require('./Unit')

class Day extends Unit {
  constructor(str, unit, context) {
    super(str, unit, context)
    this.unit = 'day'
  }
}
class Month extends Unit {
  constructor(str, unit, context) {
    super(str, unit, context)
    this.unit = 'month'
  }
}
class Quarter extends Unit {
  constructor(str, unit, context) {
    super(str, unit, context)
    this.unit = 'quarter'
  }
}
class Year extends Unit {
  constructor(str, unit, context) {
    super(str, unit, context)
    this.unit = 'year'
  }
}
class WeekDay extends Unit {
  constructor(str, unit, context) {
    super(str, unit, context)
    this.unit = 'week'
    this.d = this.d.day(str)
    //assume a wednesday in the future
    if (this.d.date() < spacetime.now(context.timezone).date()) {
      this.d = this.d.add(7, 'days')
    }
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
  constructor(str, unit, context) {
    super(str, unit, context)
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
