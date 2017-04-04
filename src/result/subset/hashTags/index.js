'use strict';
const Text = require('../../index');
//the Hashtags() subset class
const methods = {};

const find = function(r, n) {
  r = r.match('#HashTag').terms();
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
