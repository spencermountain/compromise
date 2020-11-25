const Unit = require('./Unit')

class Month extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'month'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
}
class Quarter extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'quarter'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
}
class Season extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'season'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
}
class Year extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'year'
  }
}

module.exports = {
  Month: Month,
  Quarter: Quarter,
  Season: Season,
  Year: Year,
}
