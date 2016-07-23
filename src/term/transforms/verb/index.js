'use strict';
let verb = {
  PastTense: (t) => {
    t.text += 'ed';
    t.tag('PastTense', 'manual');
    return t;
  },
  Gerund: (t) => {
    t.text += 'ing';
    t.tag('Gerund', 'manual');
    return t;
  }
};
module.exports = verb;
