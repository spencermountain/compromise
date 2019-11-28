const spacetime = require('spacetime')

class Unit {
  constructor(str, unit) {
    this.str = str
    this.unit = unit || 'day'
    // set it to the beginning of the given unit
    let d = spacetime(str)
    // set to beginning
    if (d.isValid()) {
      d = d.startOf(unit)
    }
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
module.exports = Unit
