'use strict';
const Text = require('../../index');
const Date = require('./date');

class Dates extends Text {
  constructor(list) {
    super(list);
    this.list = this.find().list
    return this
  }
  find() {
    let dates = this.match('#Date+');
    dates.list = dates.list.map((ts) => {
      return new Date(ts.terms, ts.context)
    })
    return dates
  }
  toShortForm() {
    this.match('#Month').terms().forEach((t) => {
      t = t.month.toShortForm()
    })
    this.match('#WeekDay').terms().forEach((t) => {
      t = t.weekday.toShortForm()
    })
    return this
  }
  toLongForm() {
    this.match('#Month').terms().forEach((t) => {
      t = t.month.toLongForm()
    })
    this.match('#WeekDay').terms().forEach((t) => {
      t = t.weekday.toLongForm()
    })
    return this
  }
  parse() {
    return this.list.map((ts) => ts.parse())
  }
}

module.exports = Dates;
