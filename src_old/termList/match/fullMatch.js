'use strict';

//compare 1 term to one reg
const perfectMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  // console.log(term.normal, '   ', reg);
  // console.log('\n\n');
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
      if (term.normal === str || term.text === str) {
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

module.exports = perfectMatch;
