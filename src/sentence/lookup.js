'use strict';
//a regex-like lookup for a sentence.
// returns a Terms class, an array of terms
const Terms = require('./terms');

//a particular slice of words+terms to try
const tryMatch = function(terms, words) {
  for(let i = 0; i < terms.length; i++) {
    if (!terms[i].lookup(words[i])) {
      return false;
    }
  }
  return true;
};

const lookup = function(terms, str) {
  let words = str.split(' ');
  //don't do last word, if search is 4 words long..
  let len = terms.length - words.length + 1;
  for(let i = 0; i < len; i++) {
    let slice = terms.slice(i, i + words.length);
    if (tryMatch(slice, words)) {
      return new Terms(slice);
    }
  }
  return new Terms([]);
};

module.exports = lookup;
