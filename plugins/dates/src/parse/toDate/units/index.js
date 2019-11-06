const spacetime = require('spacetime')

class Unit {
  constructor(str, unit) {
    this.str = str
    this.unit = unit || 'day'
    this.d = spacetime.now()
    // set it to the beginning of the given unit
    this.d = this.d.startOf(unit)
  }
  // make a new one
  clone() {
    let d = new Unit(this.str)
    d.unit = this.unit
    return d
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
// class Day extends Unit {
//   constructor(str, unit) {
//     super(str, unit)
//     this.unit = 'day'
//   }
// }

module.exports = {
  Unit: Unit,
  // Day: Day,
}
