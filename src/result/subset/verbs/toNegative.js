'use strict';
//
const toNegative = (ts) => {
  ts = ts.insertAt(0, 'not');
  return ts;
};
module.exports = toNegative;
