'use strict';
const Text = require('../../index');
const getGrams = require('./getGrams');

class Ngrams extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        normal: ts.out('normal'),
        count: ts.count,
        size: ts.size
      };
    });
  }
  unigrams() {
    this.list = this.list.filter((g) => g.size === 1);
    return this;
  }
  bigrams() {
    this.list = this.list.filter((g) => g.size === 2);
    return this;
  }
  trigrams() {
    this.list = this.list.filter((g) => g.size === 3);
    return this;
  }

  //default sort the ngrams
  sort() {
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

  static find(r, n, size) {
    let opts = {
      size: [1, 2, 3, 4]
    };
    //only look for bigrams, for example
    if (size) {
      opts.size = [size];
    }
    //fetch them
    let arr = getGrams(r, opts);
    r = new Ngrams(arr);
    //default sort
    r.sort();
    //grab top one, or something
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Ngrams;
