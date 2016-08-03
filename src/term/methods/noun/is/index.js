'use strict';
const isPlural = require('./isPlural');
const is = {
  /** is this term currently plural */
  plural: (t) => {
    return isPlural(t);
  },
  /** is this term currently not-plural */
  singular: (t) => {
    return !isPlural(t);
  }
}
module.exports = is
