'use strict';
const Ngrams = require('./index');
const getGrams = require('./getGrams');

//like an n-gram, but only the endings of matches
const EndGrams = function(arr, lexicon, reference) {
  Ngrams.call(this, arr, lexicon, reference);
};

//Inherit properties
EndGrams.prototype = Object.create(Ngrams.prototype);

//like an n-gram, but only the startings of matches
EndGrams.find = function(r, n, size) {
  let opts = {
    size: [1, 2, 3, 4],
    edge: 'end'
  };
  //only look for bigrams, for example
  if (size) {
    opts.size = [size];
  }
  //fetch them
  let arr = getGrams(r, opts);
  r = new EndGrams(arr);
  //default sort
  r.sort();
  //grab top one, or something
  if (typeof n === 'number') {
    r = r.get(n);
  }
  return r;
};
module.exports = EndGrams;
