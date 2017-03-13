'use strict';
const Text = require('../../index');

class Quotations extends Text {
  static find(r, n) {
    r = r.match('#Quotation+');
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = Quotations;
