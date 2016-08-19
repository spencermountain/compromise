'use strict';
//
const Result = require('./result');
const syntax = require('./syntax');

//compare 1 term to one reg
const isFullMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  //pos-match
  if (reg.signals.pos) {
    for(let i = 0; i < reg.signals.pos.length; i++) {
      let tag = reg.signals.pos[i];
      if (term.pos[tag]) {
        return true;
      }
    }
    return false;
  }
  //one-of term-match
  if (reg.signals.oneOf) {
    for(let i = 0; i < reg.signals.oneOf.length; i++) {
      let str = reg.signals.oneOf[i];
      if (term.normal === str || term.text === str) {
        return true;
      }
    }
    return false;
  }
  //text-match
  if (reg.normal && term.normal === reg.normal || term.text === reg.normal) {
    return true;
  }
  return false;
};

//go for a new match, starting here.
const tryHere = (terms, t, regs) => {
  for(let r = 0; r < regs.length; r++) {
    if (isFullMatch(terms.get(t + r), regs[r])) {
      continue;
    }
    return null;
  }
  return terms.slice(t, t + regs.length);
};

//
const match = function(terms, str) {
  let regs = syntax(str);
  console.log(regs);
  let result = new Result();
  for(let t = 0; t < terms.length; t++) {
    let m = tryHere(terms, t, regs);
    if (m) {
      result.matches.push(m);
    }
  }
  return result;
};

module.exports = match;
