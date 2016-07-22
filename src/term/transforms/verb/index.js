'use strict';
let verb = {
  PastTense: (t) => {
    t.text += 'ed';
    return t;
  }
};
module.exports = verb;
