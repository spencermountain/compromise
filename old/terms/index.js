'use strict';
const build = require('./build');
const getters = require('./getters');
let w = require('../world');

//Terms is an array of Term objects, and methods that wrap around them
const Terms = function(arr, world, refText, refTerms) {
  this.terms = arr;
  this.world = world || w;
  this.refText = refText;
  this._refTerms = refTerms;
  this.get = n => {
    return this.terms[n];
  };
  //apply getters
  let keys = Object.keys(getters);
  for (let i = 0; i < keys.length; i++) {
    Object.defineProperty(this, keys[i], getters[keys[i]]);
  }
};

Terms.fromString = function(str, world) {
  let termArr = build(str, world);
  let ts = new Terms(termArr, world, null);
  //give each term a original to this ts
  ts.terms.forEach(t => {
    t.parentTerms = ts;
  });
  return ts;
};

// Terms = require('./methods/lookup')(Terms);
require('./match')(Terms);
require('./methods/tag')(Terms);
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
