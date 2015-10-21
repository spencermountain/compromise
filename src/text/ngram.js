'use strict';
//split a string into all possible parts
const fns = require('../fns.js');

//n-gram takes a list of pre-cleaned terms, and makes no assumptions
const ngram = function(terms, options) {
  options = options || {};
  const min_count = options.min_count || 1; // minimum hit-count
  const max_size = options.max_size || 5; // maximum gram count
  const keys = [null];
  let results = [];
  //prepare the keys object
  for (let i = 1; i <= max_size; i++) {
    keys.push({});
  }
  // Create a hash for counting..
  const textlen = terms.length;
  for (let i = 0; i < textlen; i++) {
    let s = terms[i];
    keys[1][s] = (keys[1][s] || 0) + 1;
    for (let j = 2; j <= max_size; j++) {
      if (i + j <= textlen) {
        s += ' ' + terms[i + j - 1];
        keys[j][s] = (keys[j][s] || 0) + 1;
      } else {
        break;
      }
    }
  }
  // map the hash to an array for sorting
  for (let k = 1; k < max_size; k++) {
    results[k] = [];
    const key = keys[k];
    const words = Object.keys(keys[k]);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (key[word] >= min_count) {
        results[k].push({
          'word': word,
          'count': key[word],
          'size': k
        });
      }
    }
  }
  //post-process + sort
  results = fns.compact(results);
  results = results.map(function(r) {
    r = r.sort(function(a, b) {
      return b.count - a.count;
    });
    return r;
  });
  return results;
};

// console.log(ngram("hi dr nick! dr nick!".split(" ")))

module.exports = ngram;
