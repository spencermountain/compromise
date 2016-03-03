'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class
const Terms = require('./terms');

//a particular slice of words+terms to try of equal-length
const tryMatch = function(terms, words, options) {
  for(let i = 0; i < terms.length; i++) {
    if (!terms[i].match(words[i], options)) {
      return false;
    }
  }
  return true;
};

//find first match and return []Terms
const findAll = function(terms, str, options) {
  let result = [];
  let words = str.split(' ');
  let len = terms.length - words.length + 1;
  for(let i = 0; i < len; i++) {
    let slice = terms.slice(i, i + words.length);
    if (tryMatch(slice, words)) {
      result.push(new Terms(slice));
    }
  }
  return result;
};

//calls Terms.replace() on each found result
const replaceAll = function(terms, str, replacement, options) {
  let list = findAll(terms, str, options);
  list.forEach((t) => {
    t.replace(replacement, options);
  });
};

module.exports = {
  findAll,
  replaceAll,
};
