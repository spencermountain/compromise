'use strict';
const Terms = require('../paths').Terms

const splitMethods = (Result) => {

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, verbose);
        matches.forEach((ms) => {
          list.push(new Terms(ms));
        });
      });
      // this.list = list;
      let parent = this.parent || this;
      return new Result(list, parent);
    },

    /** return terms after this match */
    after: function(reg) {
      let after = reg + ' *';
      return this.match(after).remove(reg);
    },

    /** return terms before this match */
    before: function(reg) {
      let before = '* ' + reg;
      return this.match(before).remove(reg);
    },

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = splitMethods;
