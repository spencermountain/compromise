'use strict';
const Text = require('../../index');

class HashTags extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        text: t.text
      };
    });
  }
  static find(r, n) {
    r = r.match('#HashTag');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = HashTags;
