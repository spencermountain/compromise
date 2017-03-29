'use strict';
const syntax = require('./syntax');
const startHere = require('./startHere');

//look for quick reasons not to do a match on this ts
const canIgnore = function(ts, regs) {
  for(let i = 0; i < regs.length; i++) {
    let reg = regs[i];
    let found = false;
    if (reg.optional === true || reg.negative === true) {
      continue;
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
    //look-for missing terms
    if (reg.normal) {
      for(let o = 0; o < ts.terms.length; o++) {
        if (ts.terms[o].normal === reg.normal || ts.terms[o].silent_term === reg.normal) {
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

//
const match = (ts, reg, verbose) => {
  //parse for backwards-compatibility
  if (typeof reg === 'string') {
    reg = syntax(reg);
  }
  if (!reg || reg.length === 0) {
    return [];
  }
  //do a fast-pass for easy negatives
  if (canIgnore(ts, reg)) {
    return [];
  }
  //ok, start long-match
  let matches = [];
  for (let t = 0; t < ts.terms.length; t++) {
    //don't loop through if '^'
    if (t > 0 && reg[0] && reg[0].starting) {
      break;
    }
    let m = startHere(ts, t, reg, verbose);
    if (m) {
      matches.push(m);
      //ok, don't try to match these again.
      let skip = m.length - 1;
      t += skip; //this could use some work
    }
  }
  return matches;
};
module.exports = match;
