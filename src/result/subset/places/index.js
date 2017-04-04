'use strict';
const Text = require('../../index');
const Place = require('./place');
//the Places() subset class
const methods = {};

const find = function(r, n) {
  r = r.splitAfter('#Comma');
  r = r.match('#Place+');
  if (typeof n === 'number') {
    r = r.get(n);
  }
  r.list = r.list.map((ts) => {
    return new Place(ts.terms, ts.lexicon, ts.refText, ts.refTerms);
  });
  return r;
};

module.exports = Text.makeSubset(methods, find);
