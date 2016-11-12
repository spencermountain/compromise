'use strict';

const match = (Result) => {

  const methods = {

    /** like .match(), but negative (filter-out the matches)*/
    remove: function(reg) {
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

  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
module.exports = match;
