'use strict';
const assign = require('../assign');

//date words that are sometimes-not..
const tough_dates = {
  may: true,
  april: true,
  march: true,
  june: true,
  jan: true,
};

//an integer that looks year-like
const maybe_year = function(t) {
  if (t.pos.Value) {
    let num = t.number || 0;
    if (num >= 1900 && num < 2030) {
      return true;
    }
  }
  return false;
};

//neighbouring words that indicate it is a date
const date_signals = {
  between: true,
  before: true,
  after: true,
  during: true,
  from: true,
  to: true,
  in: true,
  of: true,
  the: true,
  next: true,
};

const ambiguous_dates = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (tough_dates[t.normal] || maybe_year(t)) { //'march' or '2015'
      //if nearby another date or value
      // console.log(terms[i + 1].pos.Verb);
      if (terms[i + 1] && (terms[i + 1].pos['Value'] || terms[i + 1].pos['Date'])) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }
      if (terms[i - 1] && (terms[i - 1].pos['Value'] || terms[i - 1].pos['Date'])) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }

      //if next term is date-like
      if (terms[i + 1] && date_signals[terms[i + 1].normal]) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }
      //if last term is date-like
      if (terms[i - 1] && date_signals[terms[i - 1].normal]) {
        terms[i] = assign(t, 'Date', 'date_signal');
        continue;
      }

    }
  }
  return terms;
};

module.exports = ambiguous_dates;
