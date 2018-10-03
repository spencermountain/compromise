'use strict';
const Text = require('../../text');
const Date = require('./date');
const weekdays = require('./weekday');
const months = require('./month');
//the Dates() subset class
const methods = {
  toShortForm: function() {
    this.match('#Month')
      .terms()
      .list.forEach(ts => {
        let t = ts.terms[0];
        months.toShortForm(t);
      });
    this.match('#WeekDay')
      .terms()
      .list.forEach(ts => {
        let t = ts.terms[0];
        weekdays.toShortForm(t);
      });
    return this;
  },
  toLongForm: function() {
    this.match('#Month')
      .terms()
      .list.forEach(ts => {
        let t = ts.terms[0];
        months.toLongForm(t);
      });
    this.match('#WeekDay')
      .terms()
      .list.forEach(ts => {
        let t = ts.terms[0];
        weekdays.toLongForm(t);
      });
    return this;
  }
};

const find = function(r, n) {
  let dates = r.match('#Date+');
  if (typeof n === 'number') {
    dates = dates.get(n);
  }
  dates.list = dates.list.map(ts => {
    return new Date(ts.terms, ts.world, ts.refText, ts.refTerms);
  });
  return dates;
};

module.exports = Text.makeSubset(methods, find);
