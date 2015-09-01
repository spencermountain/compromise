"use strict";
const Term = require("../term.js");
const date_extractor = require("./date_extractor.js");
const to_number = require("./to_number.js");

class Value extends Term {
  constructor(str) {
    super(str);
    this.parent = "value";
  }

  is_date() {
    const months = /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|aug|sept|oct|nov|dec)/i;
    const times = /1?[0-9]:[0-9]{2}/;
    const days = /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tues|wed|thurs|fri|sat|sun)\b/i;
    if (this.normal.match(months) || this.normal.match(times) || this.normal.match(days)) {
      return true;
    }
    return false;
  }

  to_number() {
    return to_number(this.normal);
  }

  date_extractor() {
    return ""; //date_extractor(this.normal);
  }
}

module.exports = Value;
