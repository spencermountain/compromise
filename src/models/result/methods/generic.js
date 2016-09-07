'use strict';
const Term = require('../../term');


const genericMethods = (Result) => {

  const methods = {

    count : function() {
      return this.list.length;
    },

    terms : function() {
      return this.list.reduce((arr, ts) => {
        arr = arr.concat(ts.terms);
        return arr;
      }, []);
    },

    pretty : function() {
      let list = this.list;
      for(let i = 0; i < list.length; i++) {
        // arr[i].pretty();
        console.log('-' + i + '-');
        list[i].forEach((t) => {
          t.render('pretty');
        });
      }
    },

    plaintext : function() {
      return this.list.reduce((str, ts) => {
        str += ts.plaintext();
        return str;
      }, '');
    },

    first : function(n) {
      return new Result([this.list[0]], this.context);
    },

    last : function(n) {
      let lastOne = this.list[this.list.length - 1];
      return new Result([lastOne], this.context);
    },

    clone: function() {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      return new Result(list);
    }
  };

  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = genericMethods;
