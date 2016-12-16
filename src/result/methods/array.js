'use strict';
const Terms = require('../../terms');

const genericMethods = (Text) => {

  const methods = {

    /**copy data properly so later transformations will have no effect*/
    clone: function () {
      let list = this.list.map((ts) => {
        return ts.clone();
      });
      // return this;
      return new Text(list, this.lexicon, this.parent);
    },

    /**turn all sentences into one, for example*/
    terms: function () {
      // let list = this.list.reduce((all, ts) => {
      //   all = all.concat(ts.terms);
      //   return all;
      // }, []);
      // let terms = new Terms(list);
      // return new Text([terms], this.lexicon, this.parent);
      return this.match('.');
    },


    /** get the nth term of each result*/
    term: function (n) {
      let list = this.list.map((ts) => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.lexicon, this.parent);
      });
      return new Text(list, this.lexicon, this.parent);
    },

    firstTerm: function () {
      return this.match('^.');
    },
    lastTerm: function () {
      return this.match('.$');
    },

    /**use only the first result */
    first: function (n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Text(this.list.slice(0, n), this.lexicon, this.parent);
    },

    /**use only the last result */
    last: function (n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Text(this.list.slice(start, end), this.lexicon, this.parent);
    },

    /** use only the nth result*/
    get: function (n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Text([], this.lexicon, this.parent);
      }
      let ts = this.list[n];
      return new Text([ts], this.lexicon, this.parent);
    },

    filter: function (fn) {
      //treat it as a termlist filter
      if (typeof fn === 'string') {
        let list = this.list.filter((ts) => {
          return ts.has(fn);
        });
        return new Text(list, this.lexicon, this.parent);
      }
      //ad-hoc filter-method
      let list = this.list.filter(fn);
      return new Text(list, this.lexicon, this.parent);
    },
    forEach: function (fn) {
      this.list.forEach(fn);
      return this;
    },
    map: function (fn) {
      //treat it as a termlist filter
      if (typeof fn === 'string') {
        let list = this.list.map((ts) => {
          return ts[fn]();
        });
        return new Text(list, this.lexicon, this.parent);
      }
      let list = this.list.map(fn);
      return new Text(list, this.lexicon, this.parent);
    },
    //turn two result objects into one
    // combine: function (r) {
    //   let list = this.list.concat(r.list);
    //   return new Text(list, this.lexicon, this.parent);
    // },
    concat: function() {
      //any number of params
      for(let i = 0; i < arguments.length; i++) {
        for(let o = 0; o < arguments[i].list.length; o++) {
          this.list.push(arguments[i].list[o]);
        }
      }
      return this;
    },
    /** make it into one sentence/termlist */
    flatten: function () {
      let terms = [];
      this.list.forEach((ts) => {
        terms = terms.concat(ts.terms);
      });
      //dont create an empty ts
      if (!terms.length) {
        return new Text(null, this.lexicon, this.parent);
      }
      let ts = new Terms(terms, this.lexicon, this.parent);
      return new Text([ts], this.lexicon, this.parent);
    },

  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = genericMethods;
