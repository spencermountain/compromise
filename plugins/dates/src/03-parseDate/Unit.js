const spacetime = require('spacetime')

class Unit {
  constructor(input, unit, context) {
    this.unit = unit || 'day'
    context = context || {}
    let today = {}
    if (context.today) {
      today = {
        date: context.today.date(),
        month: context.today.month(),
        year: context.today.year(),
      }
    }
    // set it to the beginning of the given unit
    let d = spacetime(input, context.timezone, { today: today })

    // set to beginning
    if (d.isValid()) {
      d = d.startOf(this.unit)
    }
    Object.defineProperty(this, 'd', {
      enumerable: false,
      writable: true,
      value: d,
    })
    Object.defineProperty(this, 'context', {
      enumerable: false,
      writable: true,
      value: context,
    })
  }
  // make a new one
  clone() {
    let d = new Unit(this.d, this.unit, this.context)
    return d
  }
  log() {
    console.log('--')
    this.d.log()
    console.log('\n')
    return this
  }
  applyShift(obj = {}) {
    Object.keys(obj).forEach((k) => {
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
    this.d = spacetime.now(this.context.timezone, { today: this.context.today }) // ???
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
