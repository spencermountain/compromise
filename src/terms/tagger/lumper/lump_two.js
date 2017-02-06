'use strict';
const log = require('../paths').log;
const path = 'lumper/lump_two';
const combine = require('./combine');

const timezones = {
  standard: true,
  daylight: true,
  summer: true,
  eastern: true,
  pacific: true,
  central: true,
  mountain: true,
};

//rules that combine two words
const do_two = [
  {
    //6 am
    condition: (a, b) => (a.tag.Holiday && (b.normal === 'day' || b.normal === 'eve')),
    result: 'Holiday',
    reason: 'holiday-day'
  }, {
    //Aircraft designer
    condition: (a, b) => (a.tag.Noun && b.tag.Actor),
    result: 'Actor',
    reason: 'thing-doer'
  }, {
    //timezones
    condition: (a, b) => (timezones[a.normal] && (b.normal === 'standard time' || b.normal === 'time')),
    result: 'Time',
    reason: 'timezone'
  }, {
    //canadian dollar, Brazilian pesos
    condition: (a, b) => (a.tag.Demonym && b.tag.Currency),
    result: 'Currency',
    reason: 'demonym-currency'
  }, {
    //(454) 232-9873
    condition: (a, b) => (a.tag.NumericValue && b.tag.PhoneNumber && a.normal.length <= 3),
    result: 'PhoneNumber',
    reason: '(800) PhoneNumber'
  }
];

const lump_two = function (s) {
  log.here(path);
  for (let o = 0; o < do_two.length; o++) {
    for (let i = 0; i < s.terms.length - 1; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      if (do_two[o].condition(a, b)) {
        //merge terms
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_two[o].result, 'lump-two (' + do_two[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_two;
