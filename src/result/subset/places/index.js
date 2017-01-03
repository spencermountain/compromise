'use strict';
const Text = require('../../index');
const Place = require('./place');

class Places extends Text {
  data() {
    return this.list.map((ts) => {
      return {
        text: ts.plaintext(),
        normal: ts.normal(),
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#Place+');
    r.list = r.list.map((ts) => {
      return new Place(ts.terms, ts.lexicon, ts.parent, ts.parentTerms);
    });
    return r;
  }
}

module.exports = Places;
