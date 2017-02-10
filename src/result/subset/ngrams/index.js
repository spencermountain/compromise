'use strict';
const Text = require('../../index');
const ngram = require('./ngram');

class Ngrams extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        // text: ts.out('text'),
        normal: ts.out('normal'),
        count: ts.count,
        size: ts.size,
      };
    });
  }
  //sort the grams
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
  static find(r, n) {
    let opts = {
      size: [1, 2, 3, 4]
    };
    let arr = ngram(r, opts);
    r = new Ngrams(arr);
    r.sort();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Ngrams;
