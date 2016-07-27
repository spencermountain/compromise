'use strict';
const wrestleVerb = require('./wrestle');

let verb = {
  pasttense: (t) => {
    t.text += 'ed';
    t.tag('PastTense', 'manual');
    return t;
  },

  specific: (t) => {
    return wrestleVerb(t)
  }
};
module.exports = verb;
