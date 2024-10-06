import Unit from './Unit.js'

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
  middle() {
    this.d = this.d.add(15, 'days')
    this.d = this.d.startOf('day')
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
    this.d = this.d.minus(1, 'quarter')
    this.d = this.d.startOf(this.unit)
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

export {
  AnyMonth,
  Month,
  Quarter,
  AnyQuarter,
  Season,
  Year
}
