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
  if (reg.normal) {
    return reg.normal === term.normal || reg.normal === term.silent_term;
  }
  //one-of term-match
  if (reg.oneOf) {
    for (let i = 0; i < reg.oneOf.length; i++) {
      let str = reg.oneOf[i];
      //try a tag match
      if (str.charAt(0) === '#') {
        let tag = str.substr(1, str.length);
        if (term.tag[tag]) {
          return true;
        }
      //try a string-match
      } else if (term.normal === str || term.text === str) {
        return true;
      }
    }
    return false;
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
