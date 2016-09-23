'use strict';
const Terms = require('../../terms');

const match = (Result) => {

  const methods = {
    /** do a regex-like search through terms and return a subset */
    match : function(reg, quiet) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, quiet);
        matches.forEach((ms) => {
          list.push(new Terms(ms));
        });
      });
      return new Result(list);
    },
    /** return terms after this match */
    after : function(reg) {
      let after = reg + ' *';
      return this.match(after).remove(reg);
    },
    /** return terms before this match */
    before : function(reg) {
      let before = '* ' + reg;
      return this.match(before).remove(reg);
    },
    /** like .match(), but negative (filter-out the matches)*/
    remove : function(reg) {
      let list = [];
      this.list.forEach((ts) => {
        let matches = ts.remove(reg, this.context);
        if (matches) {
          list.push(matches);
        }
      });
      return new Result(list, this.context);
    }
  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = match;
