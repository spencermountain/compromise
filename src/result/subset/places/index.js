'use strict';
const Text = require('../../index');
const Place = require('./place');

class Places extends Text {
  parse() {
    return this.mapTerms((t) => {
      return {
        text: t.text
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
