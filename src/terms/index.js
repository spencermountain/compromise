'use strict';
const build = require('./build');
const getters = require('./getters');

//Terms is an array of Term objects, and methods that wrap around them
const Terms = function(arr, lexicon, refText, refTerms) {
  this.terms = arr;
  this.lexicon = lexicon;
  this.refText = refText;
  this._refTerms = refTerms;
  this._cacheWords = {};
  this.count = undefined;
  this.get = (n) => {
    return this.terms[n];
  };
  //apply getters
  let keys = Object.keys(getters);
  for(let i = 0; i < keys.length; i++) {
    Object.defineProperty(this, keys[i], getters[keys[i]]);
  }
};

Terms.fromString = function(str, lexicon) {
  let termArr = build(str);
  let ts = new Terms(termArr, lexicon, null);
  //give each term a reference to this ts
  ts.terms.forEach((t) => {
    t.parentTerms = ts;
  });
  return ts;
};

// Terms = require('./methods/lookup')(Terms);
require('./match')(Terms);
require('./methods/loops')(Terms);
require('./match/not')(Terms);
require('./methods/delete')(Terms);
require('./methods/insert')(Terms);
require('./methods/misc')(Terms);
require('./methods/out')(Terms);
require('./methods/replace')(Terms);
require('./methods/split')(Terms);
require('./methods/transform')(Terms);
require('./methods/lump')(Terms);
module.exports = Terms;
