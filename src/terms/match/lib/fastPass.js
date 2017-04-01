'use strict';
//
//find easy reasons to skip running the full match on this
const fastPass = (ts, regs) => {
  for(let i = 0; i < regs.length; i++) {
    let reg = regs[i];
    let found = false;
    if (reg.optional === true || reg.negative === true) {
      continue;
    }

    //look-for missing term-matches
    if (reg.normal !== undefined) {
      for(let o = 0; o < ts.terms.length; o++) {
        if (ts.terms[o].silent_term === reg.normal) {
          found = true;
          break;
        }
      }
      if (found === false) {
        return true;
      }
    }
    //look for missing tags
    if (reg.tag !== undefined) {
      for(let o = 0; o < ts.terms.length; o++) {
        if (ts.terms[o].tags[reg.tag] === true) {
          found = true;
          break;
        }
      }
      if (found === false) {
        return true;
      }
    }
  }
  return false;
};
module.exports = fastPass;
