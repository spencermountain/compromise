'use strict';
const Text = require('../../index');

class Terms extends Text {
  data() {
    return this.list.map((ts) => {
      let t = ts.terms[0];
      return {
        normal: t.normal,
        text: t.text,
        tags: Object.keys(t.tag)
      };
    });
  }
  static find(r) {
    let found = r.match('.');
    return found;
  }
}

module.exports = Terms;
