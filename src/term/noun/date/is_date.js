
'use strict';

const dates = require('../../../data/dates');

const is_date = function(str) {
  let day_reg = '(\\b' + dates.join('\\b|\\b') + '\\b)';
  day_reg = new RegExp(day_reg, 'i');
  const times_reg = /1?[0-9]:[0-9]{2}/;
  if (str.match(day_reg) || str.match(times_reg)) {
    return true;
  }
  return false;
};

module.exports = is_date;

// console.log(is_date('january fifth, 2015'));
