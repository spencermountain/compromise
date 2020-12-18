const spacetime = require('spacetime')

class Unit {
  constructor(input, unit, context, keepTime) {
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
    // if (d.isValid() && keepTime !== true) {
    //   d = d.startOf(this.unit)
    // }
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
    Object.keys(obj).forEach((unit) => {
      this.d = this.d.add(obj[unit], unit)
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
  applyRel(rel) {
    if (rel === 'next') {
      return this.next()
    }
    if (rel === 'last') {
      return this.last()
    }
    return this
  }
  applySection(section) {
    if (section === 'start') {
      return this.start()
    }
    if (section === 'end') {
      return this.end()
    }
    if (section === 'middle') {
      return this.middle()
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
  middle() {
    let diff = this.d.diff(this.d.endOf(this.unit))
    let minutes = Math.round(diff.minutes / 2)
    this.d = this.d.add(minutes, 'minutes')
    return this
  }
  // the millescond before
  before() {
    this.d = this.d.minus(1, this.unit)
    this.d = this.d.endOf(this.unit)
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
