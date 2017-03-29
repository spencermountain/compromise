'use strict';

//compare 1 term to one reg
const perfectMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne === true) {
    return true;
  }
  //pos-match
  if (reg.tag !== undefined) {
    return term.tag[reg.tag];
  }
  //text-match
  if (reg.normal !== undefined) {
    return reg.normal === term.normal || reg.normal === term.silent_term;
  }
  //one-of term-match
  if (reg.oneOf !== undefined) {
    for(let i = 0; i < reg.oneOf.tags.length; i++) {
      if (term.tag[reg.oneOf.tags[i]] === true) {
        return true;
      }
    }
    return reg.oneOf.terms[term.normal] || reg.oneOf.terms[term.silent_term];
  }
  return false;
};

//wrap above method, to support '!' negation
const isMatch = (term, reg, verbose) => {
  let found = perfectMatch(term, reg, verbose);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};
module.exports = isMatch;
