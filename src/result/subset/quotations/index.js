'use strict';
const Text = require('../../index');
//the Quotations() subset class
const methods = {
  data: function() {}
};

const find = function(r, n) {
  r = r.match('#Quotation+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
