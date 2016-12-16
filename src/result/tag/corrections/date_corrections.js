'use strict';
const log = require('../paths').log;
const path = 'date_correction';

//ambiguous 'may' and 'march'
const months = '(may|march|jan|april|sep)';
const preps = '(in|by|before|for|during|on|until|after|of)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
// const dayTime = '(night|evening|morning|afternoon|day|daytime)';

// const isDate = (num) => {
//   if (num && num < 31 && num > 0) {
//     return true;
//   }
//   return false;
// };

//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

const corrections = function (r) {
  log.here(path);

  //months
  r.match(`${months} (#Determiner|#Value|#Date)`).term(0).tag('Month', 'correction-may');
  r.match(`#Date ${months}`).term(1).tag('Month', 'correction-may');
  r.match(`${preps} ${months}`).term(1).tag('Month', 'correction-may');
  r.match(`(next|this|last) ${months}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'

  //values
  r.match('#Value #Abbreviation').tag('Value', 'value-abbr');
  r.match('a #Value').tag('Value', 'a-value');
  r.match('(minus|negative) #Value').tag('Value', 'minus-value');
  r.match('#Value grand').tag('Value', 'value-grand');
  r.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');
  r.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
  r.match('#Value and #Value').tag('Value', 'value-and-value');
  r.match('#Value point #Value').tag('Value', 'value-point-value');

  //time
  r.match('#Cardinal #Time').tag('Time', 'value-time');
  r.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  r.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  r.match('all day').tag('Time', 'all-day');

  //seasons
  r.match(`${preps}? ${thisNext} (spring|summer|winter|fall|autumn)`).tag('Date', 'thisNext-season');
  r.match(`the? ${sections} of (spring|summer|winter|fall|autumn)`).tag('Date', 'section-season');

  //june the 5th
  r.match('#Date the? #Ordinal').tag('Date', 'correction-date');
  //5th of March
  r.match('#Value of? #Month').tag('Date', 'value-of-month');
  //5 March
  r.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //march 5 to 7
  r.match('#Month #Value to #Value').tag('Date', 'value-to-value');

  //last month
  r.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
  //for four days
  r.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');

  //by 5 March
  r.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  r.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
  //2pm est
  r.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  r.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  r.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  r.match('at night').tag('Time', 'at-night');
  r.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  r.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time', 'early-evening');
  //march 12th 2018
  r.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  r.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
  r.match('#Date #Value').tag('Date', 'date-value');
  r.match('#Value #Date').tag('Date', 'value-date');
  r.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');

  //two days before
  r.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');

  //start of june
  r.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');

  //year tagging
  let value = r.match(`#Date #Value #Cardinal`).lastTerm().values();
  let num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }
  value = r.match(`#Date #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }

  return r;
};
module.exports = corrections;
