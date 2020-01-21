const spacetime = require('spacetime')

class Unit {
  constructor(str, unit, context) {
    this.unit = unit || 'day'
    context = context || {}
    // set it to the beginning of the given unit
    let d = spacetime(str, context.timezone)

    // set to beginning
    if (d.isValid()) {
      d = d.startOf(this.unit)
    }
    Object.defineProperty(this, 'd', {
      enumerable: false,
      writable: true,
      value: d,
    })
    Object.defineProperty(this, 'str', {
      enumerable: false,
      writable: true,
      value: str,
    })
    Object.defineProperty(this, 'context', {
      enumerable: false,
      writable: true,
      value: context,
    })
  }
  // make a new one
  clone() {
    let d = new Unit(this.str, this.unit, this.context)
    return d
  }
  log() {
    console.log('--')
    this.d.log()
    console.log('\n')
    return this
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
    this.d = spacetime.now(this.context.timezone) // ???
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
