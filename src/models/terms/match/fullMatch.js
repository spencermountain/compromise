'use strict';
const paths = require('../paths');
const log = paths.log;
const fns = paths.fns;
const path = 'match';

//compare 1 term to one reg
const perfectMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne) {
    return true;
  }
  //pos-match
  if (reg.tag) {
    for(let i = 0; i < reg.tag.length; i++) {
      let tag = reg.tag[i];
      if (term.tag[tag]) {
        return true;
      }
    }
    return false;
  }
  //one-of term-match
  if (reg.oneOf) {
    for(let i = 0; i < reg.oneOf.length; i++) {
      let str = reg.oneOf[i];
      //try a tag match
      if (str.match(/^#/)) {
        let tag = str.replace(/^#/, '');
        tag = fns.titleCase(tag);
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
  //text-match
  if (reg.normal) {
    if (term.normal === reg.normal || term.text === reg.normal) {
      return true;
    }
    //try contraction match too
    if (term.silent_term === reg.normal) {
      return true;
    }
  }
  return false;
};

//wrap above method, to support '!' negation
const fullMatch = (term, reg) => {
  let found = perfectMatch(term, reg);
  if (reg.negative) {
    found = !!!found;
  }
  return found;
};

module.exports = fullMatch;
