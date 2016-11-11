'use strict';
const Result = require('../result');

//turn an array of tokens into a Result object
const buildUp = (arr) => {
  let result = new Result(arr, null);
  //setup parent references
  result.list.forEach((ts) => {
    ts.terms.forEach((t) => {
      t.parent = ts;
    });
    ts.parent = result;
  });
  return result;
};
module.exports = buildUp;
