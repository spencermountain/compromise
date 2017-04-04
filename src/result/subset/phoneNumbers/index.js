'use strict';
const Text = require('../../index');

//the () subset class
const methods = {};

const find = function(r, n) {
  r = r.splitAfter('#Comma');
  r = r.match('#PhoneNumber+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};

module.exports = Text.makeSubset(methods, find);
