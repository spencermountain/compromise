'use strict';
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
  }
};
module.exports = verb;
