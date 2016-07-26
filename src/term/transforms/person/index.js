'use strict';
const wrestle = require('./wrestle')

module.exports = {
  formal: (t) => {
    return t;
  },
  informal: (t) => {
    return t;
  },
  specific: (t) => {
    return wrestle(t)
  }
};
