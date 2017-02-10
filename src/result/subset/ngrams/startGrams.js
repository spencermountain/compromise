'use strict';
const Ngrams = require('./index');
const getGrams = require('./getGrams');

//like an n-gram, but only the startings of matches
class StartGrams extends Ngrams {

  static find(r, n, size) {
    let opts = {
      size: [1, 2, 3, 4],
      edge: 'start'
    };
    //only look for bigrams, for example
    if (size) {
      opts.size = [size];
    }
    //fetch them
    let arr = getGrams(r, opts);
    r = new StartGrams(arr);
    //default sort
    r.sort();
    //grab top one, or something
    if (typeof n === 'number') {
      r = r.get(n);
    }
    return r;
  }
}

module.exports = StartGrams;
