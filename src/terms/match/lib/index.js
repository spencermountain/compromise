'use strict';
const syntax = require('./syntax');
const startHere = require('./startHere');

//look for quick reasons not to do this match
const stopFast = function(ts, regs, verbose) {
  for(let i = 0; i < regs.length; i++) {
    let reg = regs[i];
    if (reg.optional === true) {
      continue;
    }
  // if (reg.normal && ts._cacheWords[reg.normal] !== undefined) {
  //   // console.log('stop-here');
  //   return true;
  // }
  }
  return false;
};

//
const match = (ts, reg, verbose) => {
  //parse for backwards-compatibility
  if (typeof reg === 'string') {
    reg = syntax(reg);
  }

  //hit-the cache first
  if (stopFast(ts, reg, verbose)) {
    return [];
  }

  //long-match
  let matches = [];
  for (let t = 0; t < ts.terms.length; t++) {
    //don't loop through if '^'
    if (reg[0] && reg[0].starting && t > 0) {
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
