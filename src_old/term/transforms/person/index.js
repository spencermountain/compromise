'use strict';
const wrestle = require('./wrestle')

module.exports = {
  /** add honourifics */
  formal: (t) => {
    return t;
  },
  /** remove honourifics, when possible */
  informal: (t) => {
    return t;
  },
  /** find more specific tags for this Person term */
  specific: (t) => {
    return wrestle(t)
  }
};
