'use strict';

const methods = {
  toNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.to('number');
      }
    });
    return this;
  },
  toCardinal : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.to('cardinal');
      }
    });
    return this;
  },
};


module.exports = (Result) => {
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};
