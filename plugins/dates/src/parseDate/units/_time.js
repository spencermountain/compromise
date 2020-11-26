const Unit = require('./Unit')

class Hour extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'hour'
  }
}
class Minute extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'minute'
  }
}
class Moment extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context, true)
    this.unit = 'millisecond'
  }
}

module.exports = {
  Hour: Hour,
  Minute: Minute,
  Moment: Moment,
}
