'use strict';
const wrestleVerb = require('./wrestle');

let verb = {
  pasttense: (t) => {
    t.text += 'ed';
    t.tag('PastTense', 'manual');
    return t;
  },
  gerund: (t) => {
    t.text += 'ing';
    t.tag('Gerund', 'manual');
    return t;
  },
  specific: (t) => {
    return wrestleVerb(t)
  }
};
module.exports = verb;
