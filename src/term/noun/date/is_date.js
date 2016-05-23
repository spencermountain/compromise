
'use strict';

const dates = require('../../../data/dates');

//build date regex
let terms = dates.months.concat(dates.days);
let day_reg = '(\\b' + terms.join('\\b|\\b') + '\\b)';
day_reg = new RegExp(day_reg, 'i');
const times_reg = /1?[0-9]:[0-9]{2}/;
const is_date = function(str) {
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  //a straight-up year, like '2016'
  if (str.match(/^[12][0-9]{3}$/)) {
    let n = parseInt(str, 10);
    if (n > 1300 && n < 2100) {
      return true;
    }
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('2015'));
