'use strict';
const Text = require('../../index');
const Date = require('./date');
const weekdays = require('./weekday');
const months = require('./month');

class Dates extends Text {
  data() {
    return this.list.map((ts) => ts.data());
  }
  toShortForm() {
    this.match('#Month').forEachTerms((t) => {
      months.toShortForm(t);
    });
    this.match('#WeekDay').forEachTerms((t) => {
      weekdays.toShortForm(t);
    });
    return this;
  }
  toLongForm() {
    this.match('#Month').forEachTerms((t) => {
      months.toLongForm(t);
    });
    this.match('#WeekDay').forEachTerms((t) => {
      weekdays.toLongForm(t);
    });
    return this;
  }
  static find(r, n) {
    let dates = r.match('#Date+');
    if (typeof n === 'number') {
      dates = dates.get(n);
    }
    dates.list = dates.list.map((ts) => {
      return new Date(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
    });
    return dates;
  }
}

module.exports = Dates;
