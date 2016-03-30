'use strict';
const assign = require('./assign');

const tough_dates = {
  may: true,
  april: true,
  march: true,
  june: true,
};

//neighbouring words that indicate it is a date
const date_signals = {
  between: true,
  before: true,
  after: true,
  during: true,
  from: true,
  to: true,
  of: true,
  the: true,
  next: true,
};


const ambiguous_dates = function(terms) {
  for(let i = 0; i < terms.length; i++) {
    let t = terms[i];
    if (tough_dates[t.normal]) {

      //if nearby another date or value
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
