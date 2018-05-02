'use strict';
const Terms = require('../../terms');

const miscMethods = Text => {
  const methods = {
    all: function() {
      return this.parent;
    },
    index: function() {
      return this.list.map(ts => ts.index());
    },
    wordCount: function() {
      return this.terms().length;
    },
    data: function() {
      return this.list.map(ts => ts.data());
    },
    /* javascript array loop-wrappers */
    map: function(fn) {
      return this.list.map((ts, i) => {
        let text = new Text([ts], this.world);
        return fn(text, i);
      });
    },
    forEach: function(fn) {
      this.list.forEach((ts, i) => {
        let text = new Text([ts], this.world);
        fn(text, i);
      });
      return this;
    },
    filter: function(fn) {
      let list = this.list.filter((ts, i) => {
        let text = new Text([ts], this.world);
        return fn(text, i);
      });
      return new Text(list, this.world);
    },
    reduce: function(fn, h) {
      return this.list.reduce((_h, ts) => {
        let text = new Text([ts], this.world);
        return fn(_h, text);
      }, h);
    },
    find: function(fn) {
      for (let i = 0; i < this.list.length; i++) {
        let ts = this.list[i];
        let text = new Text([ts], this.world);
        if (fn(text)) {
          return text;
        }
      }
      return undefined;
    },
    /**copy data properly so later transformations will have no effect*/
    clone: function() {
      let list = this.list.map(ts => {
        return ts.clone();
      });
      return new Text(list, this.world); //this.lexicon, this.parent
    },

    /** get the nth term of each result*/
    term: function(n) {
      let list = this.list.map(ts => {
        let arr = [];
        let el = ts.terms[n];
        if (el) {
          arr = [el];
        }
        return new Terms(arr, this.world, this.refText, this.refTerms);
      });
      return new Text(list, this.world, this.parent);
    },
    firstTerm: function() {
      return this.match('^.');
    },
    lastTerm: function() {
      return this.match('.$');
    },

    /** grab a subset of the results*/
    slice: function(start, end) {
      this.list = this.list.slice(start, end);
      return this;
    },

    /** use only the nth result*/
    get: function(n) {
      //return an empty result
      if ((!n && n !== 0) || !this.list[n]) {
        return new Text([], this.world, this.parent);
      }
      let ts = this.list[n];
      return new Text([ts], this.world, this.parent);
    },
    /**use only the first result */
    first: function(n) {
      if (!n && n !== 0) {
        return this.get(0);
      }
      return new Text(this.list.slice(0, n), this.world, this.parent);
    },
    /**use only the last result */
    last: function(n) {
      if (!n && n !== 0) {
        return this.get(this.list.length - 1);
      }
      let end = this.list.length;
      let start = end - n;
      return new Text(this.list.slice(start, end), this.world, this.parent);
    },

    concat: function() {
      //any number of params
      for (let i = 0; i < arguments.length; i++) {
        let p = arguments[i];
        if (typeof p === 'object') {
          //Text()
          if (p.isA === 'Text' && p.list) {
            this.list = this.list.concat(p.list);
          }
          //Terms()
          if (p.isA === 'Terms') {
            this.list.push(p);
          }
        }
      }
      return this;
    },

    /** make it into one sentence/termlist */
    flatten: function() {
      let terms = [];
      this.list.forEach(ts => {
        terms = terms.concat(ts.terms);
      });
      //dont create an empty ts
      if (!terms.length) {
        return new Text(null, this.world, this.parent);
      }
      let ts = new Terms(terms, this.world, this, null);
      return new Text([ts], this.world, this.parent);
    },

    /** see if these terms can become this tag*/
    canBe: function(tag) {
      this.list.forEach(ts => {
        ts.terms = ts.terms.filter(t => {
          return t.canBe(tag);
        });
      });
      return this;
    },

    /** sample part of the array */
    random: function(n) {
      n = n || 1;
      let r = Math.floor(Math.random() * this.list.length);
      let arr = this.list.slice(r, r + n);
      //if we're off the end, add some from the start
      if (arr.length < n) {
        let diff = n - arr.length;
        if (diff > r) {
          diff = r; //prevent it from going full-around
        }
        arr = arr.concat(this.list.slice(0, diff));
      }
      return new Text(arr, this.world, this.parent);
    },
    setPunctuation: function(punct) {
      this.list.forEach((ts) => ts.setPunctuation(punct));
      return this;
    },
    getPunctuation: function(num) {
      //support num param
      if (num || num === 0) {
        if (!this.list[num]) {
          return '';
        }
        return this.list[num].getPunctuation();
      }
      return this.list.map((ts) => ts.getPunctuation());
    },
    //jquery-like api aliases
    offset: function() {
      return this.out('offset');
    },
    text: function() {
      return this.out('text');
    }
  };
  //aliases
  methods.eq = methods.get;
  methods.join = methods.flatten;
  Text.addMethods(Text, methods);
};

module.exports = miscMethods;
