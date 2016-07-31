'use strict';
const wrestleVerb = require('./wrestle');

let verb = {
  /** convert to past tense */
  pasttense: (t) => {
    t.text += 'ed';
    t.tag('PastTense', 'manual');
    return t;
  },

  /** tag more specific forms of this verb */
  specific: (t) => {
    return wrestleVerb(t)
  }
};
module.exports = verb;
