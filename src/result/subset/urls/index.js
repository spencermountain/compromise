'use strict';
const Text = require('../../index');
//the Urls() subset class
const methods = {};

const find = function(r, n) {
  r = r.match('#Url');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
