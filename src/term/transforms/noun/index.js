'use strict';
let noun = {
  Plural: (t) => {
    t.text += 's';
    t.tag('Plural');
    return t;
  },
  Singular: (t) => {
    t.text.replace('s$', '');
    t.tag('Singular');
    return t;
  }
};
module.exports = noun;
