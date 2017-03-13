'use strict';
const log = require('../paths').log;
const path = 'lumper/lump_three';
const combine = require('./combine');

//rules for combining three terms into one
const do_three = [
  {
    //John & Joe's
    condition: (a, b, c) => (a.tag.Noun && (b.text === '&' || b.normal === 'n') && c.tag.Noun),
    result: 'Organization',
    reason: 'Noun-&-Noun'
  },
  {
    //1 800 PhoneNumber
    condition: (a, b, c) => (a.tag.Value && b.tag.Value && c.tag.PhoneNumber && b.normal.length === 3 && a.normal.length < 3),
    result: 'PhoneNumber',
    reason: '1-800-PhoneNumber'
  },
];

const lump_three = function(s) {
  log.here(path);
  for (let o = 0; o < do_three.length; o++) {
    for (let i = 0; i < s.terms.length - 2; i++) {
      let a = s.terms[i];
      let b = s.terms[i + 1];
      let c = s.terms[i + 2];
      if (do_three[o].condition(a, b, c)) {
        //merge terms A+B
        combine(s, i);
        //merge A+C
        combine(s, i);
        //tag it as POS
        s.terms[i].tagAs(do_three[o].result, 'lump-three (' + do_three[o].reason + ')');
      }
    }
  }
  return s;
};

module.exports = lump_three;
