'use strict';

const dates = require('../../../data/dates').months;
const month = '(' + dates.join('|') + ')';
const day = '([0-9]{1,2})';
const year = '\'?([12][0-9]{3})';

const rules = [{
  reg: `${month} ${day} ${year}`, //'March 1st 1987'
  order: ['month', 'day', 'year']
}, {
  reg: `${day} of ${month} ${year}`, //'3rd of March 1969',
  order: ['day', 'month', 'year']
}, {
  reg: `${month} ${year}`, //'March 1969',
  order: ['month', 'year']
}, {
  reg: `${month} ${day}`, //'March 18th',
  order: ['month', 'day']
}, {
  reg: `${day} ${month}`, //'18th of March',
  order: ['month', 'day']
}, {
  reg: `${year}`, //'1998'
  order: ['year']
}].map(function (o) {
  o.reg = new RegExp(o.reg, '');
  return o;
});
module.exports = rules;
