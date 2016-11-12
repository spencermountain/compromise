'use strict';
const Terms = require('../paths').Terms

const insertMethods = (Result) => {

  const methods = {
    /** add these terms to the end */
    append: function (str) {
      this.list.forEach((ts) => {
        ts.append(str)
      })
      return this;
    },
  };
  //put them on Result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = insertMethods;
