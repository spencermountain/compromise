'use strict';
const Text = require('../../index');

class Bigrams extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.out('text'),
        normal: ts.out('normal'),
        count: ts.count
      };
    });
  }
  static find(r, n) {
    let opts = {
      size: [2]
    };
    r = ngram(this, opts);
    // r = r.unique();
    // r = r.sort('freq');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Bigrams;
