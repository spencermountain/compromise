'use strict';
const Result = require('./index');
const Term = require('../term');
const Terms = require('../terms');
//make a result object from a  string (used in lexicon)
const quick = function(str) {
  let t = new Term(str);
  let ts = new Terms([t]);
  return new Result([ts]);
};

module.exports = quick;

// quick('walk').tag('Verb').check();
