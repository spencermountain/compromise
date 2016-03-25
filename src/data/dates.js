'use strict';
//terms that are 'Date' term
let months = [
  'january',
  'february',
  // "march",  //ambig
  'april',
  // "may",   //ambig
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
  'jan',
  'feb',
  'mar',
  'apr',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
  'sept',
  'sep',
];
let days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
  'mon',
  'tues',
  'wed',
  'thurs',
  'fri',
  'sat',
  'sun'
];

let durations = [
  'millisecond',
  'second',
  'minute',
  'hour',
  'morning',
  'afternoon',
  'evening',
  'night',
  'day',
  'week',
  'month',
  'year',
  'decade',
  'century',
];
let relative = [
  'yesterday',
  'today',
  'tomorrow',
  'week',
  'weekend',
  'tonight',
];

module.exports = {
  days: days,
  months: months,
  durations: durations,
  relative: relative
};
