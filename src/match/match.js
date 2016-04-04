'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class
const Result = require('./result');
const syntax_parse = require('./syntax_parse');
const match_term = require('./match_term');


// take a slice of our terms, and try a match starting here
const tryFromHere = function(terms, regs, options) {
  let result = [];
  let which_term = 0;
  for(let i = 0; i < regs.length; i++) {
    let term = terms[which_term];
    //if we hit the end of terms, prematurely
    if (!term) {
      return null;
    }
    //find a match with term, (..), [..], or ~..~ syntax
    if (match_term(term, regs[i], options)) {
      //handle '$' logic
      if (regs[i].signals.trailing && terms[which_term + 1]) {
        return null;
      }
      //handle '^' logic
      if (regs[i].signals.leading && which_term !== 0) {
        return null;
      }
      result.push(terms[which_term]);
      which_term += 1;
      continue;
    }
    //if it's a contraction, go to next term
    if (term.normal === '') {
      result.push(terms[which_term]);
      which_term += 1;
      term = terms[which_term];
    }
    //support wildcards, some matching logic
    // '.' means easy-pass
    if (regs[i].signals.any_one) {
      result.push(terms[which_term]);
      which_term += 1;
      continue;
    }
    //else, if term was optional, continue anyways
    if (regs[i].signals.optional) {
      continue; //(this increments i, but not which_term)
    }
    //attempt is dead.
    return null;
  }
  //success, return terms subset
  return result;
};


//find first match and return []Terms
const findAll = function(terms, regs, options) {
  let result = [];
  regs = syntax_parse(regs || '');
  // one-off lookup for ^
  // '^' token is 'must start at 0'
  if (regs[0].signals.leading) {
    let match = tryFromHere(terms, regs, options) || [];
    if (match) {
      return [new Result(match)];
    } else {
      return null;
    }
  }

  //repeating version starting from each term
  let len = terms.length; // - regs.length + 1;
  for(let i = 0; i < len; i++) {
    let termSlice = terms.slice(i, terms.length);
    let match = tryFromHere(termSlice, regs, options);
    if (match) {
      result.push(new Result(match));
    }
  }
  //if we have no results, return null
  if (result.length === 0) {
    return null;
  }
  return result;
};

//calls Terms.replace() on each found result
const replaceAll = function(terms, regs, replacement, options) {
  let list = findAll(terms, regs, options);
  list.forEach((t) => {
    t.replace(replacement, options);
  });
};


module.exports = {
  findAll,
  replaceAll,
};
