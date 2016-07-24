'use strict';
const normalize = require('./normalize');

module.exports = {
  Normal: (t) => {
    t.text += normalize(t.text);
    return t;
  },
  LowerCase: (t) => {
    t.text = t.text.toLowerCase();
    return t;
  },
  UpperCase: (t) => {
    t.text = t.text.toUpperCase();
    return t;
  },
  TitleCase: (t) => {
    t.text = t.text.replace(/^[a-z]/, (x) => x.toUpperCase());
    return t;
  }
};
