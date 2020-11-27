const Unit = require('./Unit')

class Week extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
    if (this.d.isValid()) {
      this.d = this.d.startOf('week')
    }
  }
}

//may need some work
class WeekEnd extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
    if (this.d.isValid()) {
      this.d = this.d.day('saturday')
      this.d = this.d.startOf('day')
    }
  }
  start() {
    this.d = this.d.day('saturday').startOf('day')
    return this
  }
  // end() {
  //   this.d = this.d.day('sunday').endOf('day')
  //   return this
  // }
  next() {
    this.d = this.d.add(1, this.unit)
    this.d = this.d.startOf('weekend')
    return this
  }
  last() {
    this.d = this.d.minus(1, this.unit)
    this.d = this.d.startOf('weekend')
    return this
  }
}

module.exports = {
  Week: Week,
  WeekEnd: WeekEnd,
}
