'use strict';
const Terms = require('../paths').Terms

const replaceMethods = (Result) => {

  const methods = {
    /** remove this subset, and insert this new thing in there */
    replace: function(reg) {

      return this;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = replaceMethods;
