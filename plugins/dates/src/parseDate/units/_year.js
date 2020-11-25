const Unit = require('./Unit')

class Week extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
  }
}
class Month extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'month'
  }
}
class Quarter extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'quarter'
  }
}
class Season extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'season'
  }
}
class Year extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'year'
  }
}
//may need some work
class WeekEnd extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
  }
  start() {
    this.d = this.d.day('saturday').startOf('day')
    return this
  }
  end() {
    this.d = this.d.day('sunday').endOf('day')
    return this
  }
}

module.exports = {
  Unit: Unit,
  Week: Week,
  Month: Month,
  Quarter: Quarter,
  Season: Season,
  Year: Year,
  WeekEnd: WeekEnd,
}
