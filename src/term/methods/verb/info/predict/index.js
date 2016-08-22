'use strict';
const paths = require('../../paths');
const log = paths.log;
const fns = paths.fns;
const suffix_rules = require('./suffix_rules');
const path = 'conjugation';

const goodTypes = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  Pluperfect: true,
  FuturePerfect: true
};

const predictForm = function(term) {
  //do we already know the form?
  let keys = Object.keys(goodTypes);
  for (let i = 0; i < keys.length; i++) {
    if (term.tag[keys[i]]) {
      log.tell('predicted ' + keys[i] + ' from pos', path);
      return keys[i];
    }
  }
  //consult our handy suffix rules
  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(term.normal, arr[i]) && arr[i].length < term.normal.length) {
      const msg = 'predicted ' + suffix_rules[arr[i]] + ' from suffix ' + arr[i];
      log.tell(msg, path);
      return suffix_rules[arr[i]];
    }
  }
  return null;
};

module.exports = predictForm;
