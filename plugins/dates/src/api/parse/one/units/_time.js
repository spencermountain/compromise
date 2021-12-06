import Unit from './Unit.js'

class Hour extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'hour'
    if (this.d.isValid()) {
      this.d = this.d.startOf('hour')
    }
  }
}
class Minute extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'minute'
    if (this.d.isValid()) {
      this.d = this.d.startOf('minute')
    }
  }
}
class Moment extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'millisecond'
  }
}

export {
  Hour,
  Minute,
  Moment
}
