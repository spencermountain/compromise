'use strict';
const Terms = require('../paths').Terms

const splitMethods = (Result) => {

  const methods = {
    /** turn result into two seperate results */
    splitAfter: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitAfter(reg, verbose).forEach((mts) => {
          list.push(new Terms(mts));
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitBefore: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitBefore(reg, verbose).forEach((mts) => {
          list.push(new Terms(mts));
        });
      });
      this.list = list;
      return this;
    },
    /** turn result into two seperate results */
    splitOn: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        ts.splitOn(reg, verbose).forEach((mts) => {
          list.push(new Terms(mts));
        });
      });
      this.list = list;
      return this;
    },
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = splitMethods;
