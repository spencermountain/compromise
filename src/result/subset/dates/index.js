'use strict';
const Text = require('../../index');
const Date = require('./date');

class Dates extends Text {
  data() {
    return this.list.map((ts) => ts.data());
  }
  toShortForm() {
    this.match('#Month').forEachTerms((t) => {
      t = t.month.toShortForm();
    });
    this.match('#WeekDay').forEachTerms((t) => {
      t = t.weekday.toShortForm();
    });
    return this;
  }
  toLongForm() {
    this.match('#Month').forEachTerms((t) => {
      t = t.month.toLongForm();
    });
    this.match('#WeekDay').forEachTerms((t) => {
      t = t.weekday.toLongForm();
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
