'use strict';
const Text = require('../../index');

class PhoneNumbers extends Text {
  data() {
    return this.terms().list.map((ts) => {
      let t = ts.terms[0];
      return {
        text: t.text
      };
    });
  }
  static find(r) {
    r = r.splitAfter('#Comma');
    r = r.match('#PhoneNumber+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = PhoneNumbers;
