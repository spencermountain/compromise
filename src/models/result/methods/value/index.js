'use strict';

const methods = {
  toNumber : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.value.number();
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
        let num = t.value.nicenumber();
        if (num) {
          t.text = '' + num;
        }
      }
    });
    return this;
  },
  toTextValue : function() {
    this.terms().forEach((t) => {
      if (t.tag.Value) {
        let num = t.value.TextValue();
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
        let num = t.value.cardinal();
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
        let num = t.value.ordinal();
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
