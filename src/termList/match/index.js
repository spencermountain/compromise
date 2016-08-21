'use strict';
//
const Result = require('./result');
const chalk = require('chalk');
const syntax = require('./syntax');
const log = require('../../log');
const path = 'match';

//compare 1 term to one reg
const isFullMatch = (term, reg) => {
  if (!term || !reg) {
    return false;
  }
  //support '.' - any
  if (reg.anyOne) {
    return true;
  }
  //pos-match
  {
    if (reg.pos) {
      for(let i = 0; i < reg.pos.length; i++) {
        let tag = reg.pos[i];
        if (term.pos[tag]) {
          return true;
        }
      }
      return false;
    }
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
    if (term.silent_term === reg.normal) {
      return true;
    }
  }
  return false;
};

//go for a new match, starting here.
const tryHere = (terms, t, regs) => {
  let term_i = t;
  for(let r = 0; r < regs.length; r++) {
    let term = terms.arr[term_i];
    if (isFullMatch(term, regs[r])) {
      term_i += 1;
      continue;
    }
    //skip-over contractions
    if (term.silent_term && !term.normal) {
      term_i += 1;
      continue;
    }
    //log the reason for stopping
    if (r > 0) {
      let msg = terms.slice(t, term_i).plaintext();
      msg += chalk.red('  ✖️ ' + term.normal);
      msg = '  ~  ' + msg;
      log.tell(msg, path);
    }
    return null;
  }
  return terms.slice(t, t + regs.length);
};

//
const match = function(terms, str) {
  let result = new Result();
  //fail fast
  if (!str || !terms) {
    return result;
  }
  let regs = syntax(str);
  // console.log(regs);
  for(let t = 0; t < terms.length; t++) {
    let m = tryHere(terms, t, regs);
    if (m) {
      result.matches.push(m);
    }
  }
  return result;
};

module.exports = match;
