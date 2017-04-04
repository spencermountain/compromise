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
    this.match('#Month').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      months.toShortForm(t);
    });
    this.match('#WeekDay').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      weekdays.toShortForm(t);
    });
    return this;
  }
  toLongForm() {
    this.match('#Month').terms().list.forEach((ts) => {
      let t = ts.terms[0];
      months.toLongForm(t);
    });
    this.match('#WeekDay').terms().list.forEach((ts) => {
      let t = ts.terms[0];
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
