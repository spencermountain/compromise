'use strict';

module.exports = (Result) => {

  Result.prototype.toFive = function() {
    this.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        console.log(t.text);
      });
    });
  };
  return Result;
};
