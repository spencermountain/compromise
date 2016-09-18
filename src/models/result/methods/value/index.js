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
  toNiceNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.to('nicenumber');
      }
    });
    return this;
  },
  toTextNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.to('textnumber');
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
  toOrdinal : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        t.to('ordinal');
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
