'use strict';

const methods = {
  toNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.info('number');
        if (num) {
          t.text = '' + num;
        }
      }
    });
    return this;
  },
  toNiceNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.info('nicenumber');
        if (num) {
          t.text = '' + num;
        }
      }
    });
    return this;
  },
  toTextNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.info('textnumber');
        if (num) {
          t.text = '' + num;
        }
      }
    });
    return this;
  },
  toCardinal : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.info('cardinal');
        if (num) {
          t.text = '' + num;
        }
      }
    });
    return this;
  },
  toOrdinal : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.info('ordinal');
        if (num) {
          t.text = '' + num;
        }
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
