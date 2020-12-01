const Unit = require('./Unit')

// a specific month, like 'March'
class AnyMonth extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'month'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
}

// a specific month, like 'March'
class Month extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'month'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
  next() {
    this.d = this.d.add(1, 'year')
    this.d = this.d.startOf('month')
    return this
  }
  last() {
    this.d = this.d.minus(1, 'year')
    this.d = this.d.startOf('month')
    return this
  }
}
class AnyQuarter extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'quarter'
    // set to beginning
    if (this.d.isValid()) {
      this.d = this.d.startOf(this.unit)
    }
  }
  last() {
    console.log(this.d.format())
    this.d = this.d.minus(1, 'quarter')
    console.log(this.d.format())
    this.d = this.d.startOf(this.unit)
    console.log(this.d.format())
    return this
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
  next() {
    this.d = this.d.add(1, 'year')
    this.d = this.d.startOf(this.unit)
    return this
  }
  last() {
    this.d = this.d.minus(1, 'year')
    this.d = this.d.startOf(this.unit)
    return this
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
  next() {
    this.d = this.d.add(1, 'year')
    this.d = this.d.startOf(this.unit)
    return this
  }
  last() {
    this.d = this.d.minus(1, 'year')
    this.d = this.d.startOf(this.unit)
    return this
  }
}
class Year extends Unit {
  constructor(input, unit, context) {
    super(input, unit, context)
    this.unit = 'year'
    if (this.d.isValid()) {
      this.d = this.d.startOf('year')
    }
  }
}

module.exports = {
  AnyMonth: AnyMonth,
  Month: Month,
  Quarter: Quarter,
  AnyQuarter: AnyQuarter,
  Season: Season,
  Year: Year,
}
