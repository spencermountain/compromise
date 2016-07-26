'use strict';
const wrestleNoun = require('./wrestle')
let noun = {
  plural: (t) => {
    t.text += 's';
    t.tag('Plural');
    return t;
  },
  singular: (t) => {
    t.text.replace('s$', '');
    t.tag('Singular');
    return t;
  },
  specific: (t) => {
    return wrestleNoun(t)
  }
};
module.exports = noun;
