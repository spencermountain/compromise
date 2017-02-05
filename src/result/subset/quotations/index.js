'use strict';
const Text = require('../../index');

class Quotations extends Text {
  data() {
    return this.list.map((t) => {
      return {
        text: t.out(),
        normal: t.out('normal'),
      };
    });
  }
  static find(r, n) {
    r = r.match('#Quotation+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Quotations;
