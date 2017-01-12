'use strict';
const Text = require('../../index');

class Terms extends Text {
  data() {
    //export all the main metadata-stuff for each term
    return this.list.map((ts) => {
      let t = ts.terms[0];
      let o = {
        normal: t.normal,
        text: t.text,
        tags: Object.keys(t.tag),
        whitespace: t.whitespace,
      };
      if (t.silent_term) {
        o.silent_term = t.silent_term;
      }
      if (t.dirty) {
        o.dirty = true;
      }
      let punct = t.endPunctuation();
      if (punct) {
        o.endPunctuation = punct;
      }
      return o;
    });
  }
  static find(r, n) {
    r = r.match('.');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Terms;
