import Unit from './Unit.js'

class Week extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'week'
    if (this.d.isValid()) {
      this.d = this.d.startOf('week')
    }
  }
  middle() {
    this.d = this.d.add(2, 'days') //wednesday
    return this
  }
  // move it to 3/4s through
  beforeEnd() {
    this.d = this.d.day('friday')
    return this
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
  end() {
    this.d = this.d.day('saturday').add(1, 'day').endOf('day')
    if (this.context.dayEnd) {
      this.d = this.d.time(this.context.dayEnd)
    }
    return this
  }
  next() {
    this.d = this.d.add(1, this.unit)
    this.d = this.d.startOf('day')
    return this
  }
  last() {
    this.d = this.d.minus(1, this.unit)
    this.d = this.d.startOf('day')
    return this
  }
}

export { Week, WeekEnd }
