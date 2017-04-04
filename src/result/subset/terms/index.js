'use strict';
const Text = require('../../index');
const Term = require('./term');

//the Terms() subset class
const methods = {
  data: function() {
    return this.list.map((ts) => ts.data());
  }
};

const find = function(r, n) {
  r = r.match('.');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Term(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
