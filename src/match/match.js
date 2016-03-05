'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class
const Terms = require('./terms');
const syntax_parse = require('./syntax_parse');


// take a slice of our terms, and try a match starting here
const tryFromHere = function(terms, regs, options) {
  let result = [];
  for(let r = 0; r < regs.length; r++) {
    let term = terms[r];
    //if we hit the end of terms, prematurely
    if (!term) {
      return null;
    }
    //find a match with term, (..), [..], or ~..~ syntax
    if (term.match(regs[r], options)) {
      result.push(terms[i]);
      continue;
    }
    //support wildcards, some matching logic
    // '.' means easy-pass
    if (regs[r].signals.any_one) {
      result.push(terms[i]);
      continue;
    }
    //else, if term was optional, continue anyways
    // if (regs[r].signals.optional) {
    //   continue;
    // }
    return null;
  }
  //success, return terms subset
  return result;
};

//find first match and return []Terms
const findAll = function(terms, match_str, options) {
  let result = [];
  let regs = syntax_parse(match_str || '');
  let len = terms.length - regs.length + 1;

  // one-off lookup for ^
  // '^' token is 'must start at 0'
  if (regs[0].leading) {
    return tryFromHere(terms, regs, options);
  }

  //try starting from each term
  for(let i = 0; i < terms.length; i++) {
    let termSlice = terms.slice(i, terms.length);
    let match = tryFromHere(termSlice, regs, options);
    if (match) {
      result.push(match);
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


//things to test
// * "john eats glue" "john eats glue", true
// * "john eats glue" "john eats", true
// * "john eats glue" "eats glue", true
// * "john eats glue" "eats glue all day", false
// *

module.exports = {
  findAll,
  replaceAll,
};
