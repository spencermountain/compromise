'use strict';
const Text = require('../../index');
//the Clauses() subset class

const methods = {};

const find = function(r, n) {
  r = r.splitAfter('#ClauseEnd');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};


module.exports = Text.makeSubset(methods, find);
