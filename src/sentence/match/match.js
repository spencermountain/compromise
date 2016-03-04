'use strict';
// a regex-like lookup for a list of terms.
// returns matches in a 'Terms' class
const Terms = require('./terms');
const syntax_parse = require('./syntax_parse');


//a particular slice of regs+terms to try of equal-length
// const tryMatch = function(terms, regs, options) {
//   for(let i = 0; i < terms.length; i++) {
//     if (!terms[i].match(regs[i], options)) {
//       return false;
//     }
//   }
//   return true;
// };
//
// //does this reg match this term?
// const doesMatch = function(term, reg, options) {
//   return term.match(reg, options);
// };


//take a slice of terms, and try to match starting here
const tryFromHere = function(terms, regs, options) {
  let result = [];
  let current_t = 0;
  for(let r = 0; r < regs.length; r++) {
    let term = terms[current_t];
    //if we hit the end of terms, prematurely
    if (!term) {
      return null;
    }
    //if we're good, keep going
    if (doesMatch(term, regs[r], options)) {
      result.push(terms[i]);
      continue;
    }
  //else, if term is optional, continue
  }
  //success, return terms subset
  return result;
};

//find first match and return []Terms
const findAll = function(terms, match_str, options) {
  let result = [];
  let regs = match_str.split(' ');
  let len = terms.length - regs.length + 1;

  // one-off lookup for ^
  // '^' token is 'must start at 0'
  if (regs[0] && regs[0].substr(0, 1) === '^') {
    regs[0] = regs[0].replace(/^\^/, '');
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
