'use strict';
const Term = require('../../term');
const Terms = require('../terms');


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


    get : function(n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Result([], this.context);
      }
      let ts = this.list[n];
      return new Result([ts], this.context);
    },
    first : function(n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Result(this.list.slice(0, n), this.context);
    },
    last : function(n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Result(this.list.slice(start, end), this.context);
    },

    /**copy data properly so later transformations will have no effect*/
    clone: function() {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      return new Result(list);
    },

    /**turn all sentences into one, for example*/
    flatten: function() {
      let list = this.list.reduce((all, ts) => {
        all = all.concat(ts.terms);
        return all;
      }, []);
      let terms = new Terms(list);
      return new Result([terms], this.context);
    }
  };

  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = genericMethods;
