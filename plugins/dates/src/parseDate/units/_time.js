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

module.exports = {
  Hour: Hour,
  Minute: Minute,
}
