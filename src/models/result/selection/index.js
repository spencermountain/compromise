'use strict';
const Terms = require('../../terms');

const match = (Result) => {

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match : function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        //an array of arrays
        let matches = ts.match(reg, verbose);
        matches.forEach((ms) => {
          list.push(new Terms(ms));
        });
      });
      // this.list = list;
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
        if (matches && matches.terms && matches.terms.length) {
          list.push(matches);
        }
      });
      this.list = list;
      return this;
    },

    /** tag a subset as selected/non-selected **/
    when: function(str, debug) {
      this.list.forEach((ts) => {
        ts.when(str, debug);
      });
      return this;
    },

    /** re-select all terms **/
    parent: function() {
      this.list.forEach((ts) => {
        ts.forEach((t) => {
          t.sel = true;
        });
      });
      return this;
    }

  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = match;
