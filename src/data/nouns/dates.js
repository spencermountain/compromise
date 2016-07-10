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
//add 'mondays'
for(let i = 0; i <= 6; i++) {
  days.push(days[i] + 's');
}

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
];
//add their plurals
let len = durations.length;
for(let i = 0; i < len; i++) {
  durations.push(durations[i] + 's');
}
durations.push('century');
durations.push('centuries');

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
