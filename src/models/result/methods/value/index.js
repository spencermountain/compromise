'use strict';

module.exports = (Result) => {

  Result.prototype.toFive = function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.text = '5';
      }
    });
    return this;
  };
  return Result;
};
