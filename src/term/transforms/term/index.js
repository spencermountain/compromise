'use strict';
const normalize = require('./normalize');

module.exports = {
  normal: (t) => {
    t.text += normalize(t.text);
    return t;
  },
  lowercase: (t) => {
    t.text = t.text.toLowerCase();
    return t;
  },
  uppercase: (t) => {
    t.text = t.text.toUpperCase();
    return t;
  },
  titlecase: (t) => {
    t.text = t.text.replace(/^[a-z]/, (x) => x.toUpperCase());
    return t;
  },
  specific: (t) => { //to be overloaded
    return t
  }
};
