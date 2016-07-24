'use strict';
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
  }
};
module.exports = noun;
