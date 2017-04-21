'use strict';
const suffix_rules = require('./suffix_rules');

const goodTypes = {
  Infinitive: true,
  Gerund: true,
  PastTense: true,
  PresentTense: true,
  FutureTense: true,
  PerfectTense: true,
  Pluperfect: true,
  FuturePerfect: true,
  Participle: true
};

const predictForm = function(term) {
  //do we already know the form?
  const keys = Object.keys(goodTypes);
  for (let i = 0; i < keys.length; i++) {
    if (term.tags[keys[i]]) {
      return keys[i];
    }
  }
  //consult our handy suffix rules
  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    const substr = term.normal.substr(-arr[i].length);
    if (substr === arr[i] && term.normal.length > arr[i].length) {
      return suffix_rules[arr[i]];
    }
  }
  return null;
};

module.exports = predictForm;
