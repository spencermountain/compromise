'use strict';
const Text = require('../../index');
const getGrams = require('./getGrams');

//the Ngrams() subset class
const methods = {
  data: function() {
    return this.list.map((ts) => {
      return {
        normal: ts.out('normal'),
        count: ts.count,
        size: ts.size
      };
    });
  },
  unigrams: function() {
    this.list = this.list.filter((g) => g.size === 1);
    return this;
  },
  bigrams: function() {
    this.list = this.list.filter((g) => g.size === 2);
    return this;
  },
  trigrams: function() {
    this.list = this.list.filter((g) => g.size === 3);
    return this;
  },
  //default sort the ngrams
  sort: function() {
    this.list = this.list.sort((a, b) => {
      if (a.count > b.count) {
        return -1;
      }
      //(tie-braker)
      if (a.count === b.count && (a.size > b.size || a.key.length > b.key.length)) {
        return -1;
      }
      return 1;
    });
    return this;
  }
};

const find = function(r, n, size) {
  let opts = {
    size: [1, 2, 3, 4]
  };
  //only look for bigrams, for example
  if (size) {
    opts.size = [size];
  }
  //fetch them
  let arr = getGrams(r, opts);
  r = new Text(arr);
  //default sort
  // r.sort();
  //grab top one, or something
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
