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
      let parent = this.parent || this;
      return new Result(list, parent);
    },

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
      //if there's no reg, remove these selected terms
      if (!reg) {
        this.list.forEach((ts) => {
          ts.terms.forEach((t) => {
            t.remove();
          });
        });
        this.list = [];
        return this;
      }
      //otherwise, remove these matches
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

    filter: function(fn) {
      this.list = this.list.filter((ts) => {
        for(let i = 0; i < ts.terms.length; i++) {

        }
      });
    }

  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = match;
