'use strict';
//this method is used to predict which current conjugation a verb is

//this method is the slowest in the whole library,
const suffix_rules = require('./suffix_rules');
const irregular_verbs = require('../../../data/irregular_verbs');
const fns = require('../../../fns.js');

let known_verbs = {};
Object.keys(irregular_verbs).forEach(function(k) {
  Object.keys(irregular_verbs[k]).forEach(function(k2) {
    known_verbs[irregular_verbs[k][k2]] = k2;
  });
});

const predict = function(w) {

  //check if known infinitive
  if (irregular_verbs[w]) {
    return 'infinitive';
  }
  //check if known infinitive
  if (known_verbs[w]) {
    return known_verbs[w];
  }

  if (w.match(/will ha(ve|d) [a-z]{2}/)) {
    return 'future_perfect';
  }
  if (w.match(/will [a-z]{2}/)) {
    return 'future';
  }
  if (w.match(/had [a-z]{2}/)) {
    return 'pluperfect';
  }
  if (w.match(/have [a-z]{2}/)) {
    return 'perfect';
  }
  if (w.match(/..erer$/)) {
    return 'actor';
  }
  if (w.match(/(^[aeiou])ing$/)) {
    return 'gerund';
  }

  const arr = Object.keys(suffix_rules);
  for (let i = 0; i < arr.length; i++) {
    if (fns.endsWith(w, arr[i]) && arr[i].length < w.length) {
      return suffix_rules[arr[i]];
    }
  }
  return 'infinitive';
};

module.exports = predict;
