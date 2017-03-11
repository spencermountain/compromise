'use strict';
const log = require('../paths').log;
const path = 'tagger/datePass';

//ambiguous 'may' and 'march'
const months = '(may|march|jan|april|sep)';
const preps = '(in|by|before|for|during|on|until|after|of|within)';
const thisNext = '(last|next|this|previous|current|upcoming|coming)';
const sections = '(start|end|middle|starting|ending|midpoint|beginning)';
// const dayTime = '(night|evening|morning|afternoon|day|daytime)';

// const isDate = (num) => {
//   if (num && num < 31 && num > 0) {
//     return true;
//   }
//   return false;
// };

//ensure a year is approximately typical for common years
//please change in one thousand years
const isYear = (num) => {
  if (num && num > 1000 && num < 3000) {
    return true;
  }
  return false;
};

//non-destructively tag values & prepositions as dates
const datePass = function (ts) {
  log.here(path);

  ts.match(`#Month #DateRange+`).tag('Date', 'correction-numberRange');
  // ts.match(`#Month #Value to #Value`).tag('Date', 'correction-contraction');

  //months
  ts.match(`${months} (#Determiner|#Value|#Date)`).term(0).tag('Month', 'correction-may');
  ts.match(`#Date ${months}`).term(1).tag('Month', 'correction-may');
  ts.match(`${preps} ${months}`).term(1).tag('Month', 'correction-may');
  ts.match(`(next|this|last) ${months}`).term(1).tag('Month', 'correction-may'); //maybe not 'this'

  //values
  ts.match('#Value #Abbreviation').tag('Value', 'value-abbr');
  ts.match('a #Value').tag('Value', 'a-value');
  ts.match('(minus|negative) #Value').tag('Value', 'minus-value');
  ts.match('#Value grand').tag('Value', 'value-grand');
  // ts.match('#Ordinal (half|quarter)').tag('Value', 'ordinal-half');//not ready
  ts.match('(half|quarter) #Ordinal').tag('Value', 'half-ordinal');
  ts.match('(hundred|thousand|million|billion|trillion) and #Value').tag('Value', 'magnitude-and-value');
  ts.match('#Value point #Value').tag('Value', 'value-point-value');

  //time
  ts.match('#Cardinal #Time').tag('Time', 'value-time');
  ts.match('(by|before|after|at|@|about) #Time').tag('Time', 'preposition-time');
  ts.match('(#Value|#Time) (am|pm)').tag('Time', 'value-ampm');
  ts.match('all day').tag('Time', 'all-day');

  //seasons
  ts.match(`${preps}? ${thisNext} (spring|summer|winter|fall|autumn)`).tag('Date', 'thisNext-season');
  ts.match(`the? ${sections} of (spring|summer|winter|fall|autumn)`).tag('Date', 'section-season');

  //june the 5th
  ts.match('#Date the? #Ordinal').tag('Date', 'correction-date');
  //5th of March
  ts.match('#Value of? #Month').tag('Date', 'value-of-month');
  //5 March
  ts.match('#Cardinal #Month').tag('Date', 'cardinal-month');
  //march 5 to 7
  ts.match('#Month #Value to #Value').tag('Date', 'value-to-value');

  //last month
  ts.match(`${thisNext} #Date`).tag('Date', 'thisNext-date');
  //for four days
  ts.match(`${preps}? #Value #Duration`).tag('Date', 'value-duration');

  //by 5 March
  ts.match('due? (by|before|after|until) #Date').tag('Date', 'by-date');
  //tomorrow before 3
  ts.match('#Date (by|before|after|at|@|about) #Cardinal').not('^#Date').tag('Time', 'date-before-Cardinal');
  //2pm est
  ts.match('#Time (eastern|pacific|central|mountain)').term(1).tag('Time', 'timezone');
  ts.match('#Time (est|pst|gmt)').term(1).tag('Time', 'timezone abbr');
  //saturday am
  ts.match('#Date (am|pm)').term(1).unTag('Verb').unTag('Copula').tag('Time', 'date-am');
  //late at night
  ts.match('at night').tag('Time', 'at-night');
  ts.match('in the (night|evening|morning|afternoon|day|daytime)').tag('Time', 'in-the-night');
  ts.match('(early|late) (at|in)? the? (night|evening|morning|afternoon|day|daytime)').tag('Time', 'early-evening');
  //march 12th 2018
  ts.match('#Month #Value #Cardinal').tag('Date', 'month-value-cardinal');
  ts.match('(last|next|this|previous|current|upcoming|coming|the) #Date').tag('Date', 'next-feb');
  ts.match('#Date #Value').tag('Date', 'date-value');
  ts.match('#Value #Date').tag('Date', 'value-date');
  ts.match('#Date #Preposition #Date').tag('Date', 'date-prep-date');

  //two days before
  ts.match('#Value #Duration #Conjunction').tag('Date', 'val-duration-conjunction');

  //start of june
  ts.match(`the? ${sections} of #Date`).tag('Date', 'section-of-date');

  //year tagging
  let value = ts.match(`#Date #Value #Cardinal`).lastTerm().values();
  let num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-value-year');
  }
  //scoops up a bunch
  value = ts.match(`#Date+ #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year');
  }
  //feb 8 2018
  value = ts.match(`#Month #Value #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year2');
  }
  //feb 8 to 10th 2018
  value = ts.match(`#Month #Value to #Value #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'date-year3');
  }
  //in 1998
  value = ts.match(`(in|of|by|during|before|starting|ending|for|year) #Cardinal`).lastTerm().values();
  num = value.numbers()[0];
  if (isYear(num)) {
    value.tag('Year', 'preposition-year');
  }
  //fifth week in 1998
  ts.match('#Duration in #Date').tag('Date', 'duration-in-date');

  return ts;
};

module.exports = datePass;
