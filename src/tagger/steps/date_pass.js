'use strict';
const log = require('../paths').log;
const path = 'tagger/datePass';

const preDate = {
  on: true,
  in: true,
  before: true,
  by: true,
  after: true,
  during: true,
};

//ensure a year is approximately typical for common years
const isYear = (t) => {
  if (t.pos.Ordinal) {
    return false;
  }
  let num = t.info('number');
  if (!num || num < 1000 || num > 3000) {
    return false;
  }
  return true;
};

//rules for two-term dates
const twoDates = [
  {
    condition: (a, b) => (preDate[a.normal] && b.pos.Date),
    reason: 'predate-date'
  },
];

//rules for three-term dates
const threeDates = [
  {
    condition: (a, b, c) => (a.pos.Month && b.pos.Value && c.pos.Cardinal && isYear(c)),
    reason: 'month-value-year'
  },
  {
    condition: (a, b, c) => (a.pos.Date && b.normal === 'and' && c.pos.Date),
    reason: 'date-and-date'
  },
];

//non-destructively tag values & prepositions as dates
const datePass = function(s) {
  log.here(path);
  //set verbs as auxillaries
  for(let i = 0; i < s._terms.length - 1; i++) {
    let a = s._terms[i];
    let b = s._terms[i + 1];
    let c = s._terms[i + 2];
    if (c) {
      for(let o = 0; o < threeDates.length; o++) {
        if (threeDates[o].condition(a, b, c)) {
          a.tag('Date', threeDates[o].reason);
          b.tag('Date', threeDates[o].reason);
          c.tag('Date', threeDates[o].reason);
        }
      }
    }
    for(let o = 0; o < twoDates.length; o++) {
      if (twoDates[o].condition(a, b)) {
        a.tag('Date', twoDates[o].reason);
        b.tag('Date', twoDates[o].reason);
      }
    }
  }
  return s;
};

module.exports = datePass;
