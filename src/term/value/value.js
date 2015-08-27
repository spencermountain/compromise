'use strict'
let Term = require("../term.js")
let date_extractor = require("./date_extractor.js")
let to_number = require("./to_number.js")

class Value extends Term {
  constructor(str) {
    super(str)
  }

  is_date() {
    let months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i
    let times = /1?[0-9]:[0-9]{2}/
    let days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i
    if (this.normal.match(months) || this.normal.match(times) || this.normal.match(days)) {
      return true
    }
    return false
  }

  to_number() {
    return to_number(this.normal)
  }

  date_extractor() {
    return date_extractor(this.normal)
  }

}

// let t = new Value("january 5th 1998")
// console.log(t.date_extractor())

module.exports = Value
