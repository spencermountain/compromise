'use strict';
const Terms = require('../../terms');

const genericMethods = (Result) => {

  const methods = {

    /**copy data properly so later transformations will have no effect*/
    clone: function () {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      return new Result(list);
    },

    /**turn all sentences into one, for example*/
    flatten: function () {
      let list = this.list.reduce((all, ts) => {
        all = all.concat(ts.terms);
        return all;
      }, []);
      let terms = new Terms(list);
      return new Result([terms], this.parent);
    },

    all: function () {
      return this.parent || this;
    },

    /** get the nth term of each result*/
    term: function (n) {
      let list = this.list.map((ts) => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.context);
      });
      return new Result(list, this.parent);
    },

    /**use only the first result */
    first: function (n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Result(this.list.slice(0, n), this.parent);
    },

    /**use only the last result */
    last: function (n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Result(this.list.slice(start, end), this.parent);
    },

    /** use only the nth result*/
    get: function (n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Result([], this.parent);
      }
      let ts = this.list[n];
      return new Result([ts], this.parent);
    },

    filter: function (fn) {
      this.list = this.list.filter(fn)
      return this
    }

  };

  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = genericMethods;
