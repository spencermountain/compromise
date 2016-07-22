'use strict';
let noun = {
  Plural: (t) => {
    t.text += 's';
    return t;
  },
  Singular: (t) => {
    t.text += 's';
    return t;
  }
};
module.exports = noun;
