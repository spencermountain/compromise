'use strict';
const Text = require('../../index');

class HashTags extends Text {
  static find(r, n) {
    r = r.match('#HashTag').terms();
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = HashTags;
