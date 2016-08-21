'use strict';
//
const Result = require('./result');
const chalk = require('chalk');
const syntax = require('./syntax');
const log = require('../../log');
const path = 'match';
const matchp = require('./match');
const perfectMatch = matchp.perfectMatch;

const startHere = (terms, startAt, regs) => {
  let term_i = startAt;
  //check each regex-thing
  for(let reg_i = 0; reg_i < regs.length; reg_i++) {
    let term = terms.get(term_i);
    if (!term) {
      return null;
    }
    //check a perfect match
    if (perfectMatch(term, regs[reg_i])) {
      term_i += 1;
      let soFar = terms.slice(startAt, term_i).plaintext();
      log.tell(soFar + '..', path);
      continue;
    }
    //skip over silent contraction terms
    if (term.silent_term && !term.normal) {
      //try the next one
      term_i += 1;
      reg_i -= 1;
      continue;
    }
    // console.log(chalk.red('   -dead: ' + terms.get(term_i).normal));
    return null;
  }
  return terms.slice(startAt, term_i);
};


//
const match = function(terms, str) {
  log.here(path);
  let result = new Result();
  //fail fast
  if (!str || !terms) {
    return result;
  }
  let regs = syntax(str);
  // console.log(regs);
  for(let t = 0; t < terms.length; t++) {
    let m = startHere(terms, t, regs);
    if (m) {
      result.matches.push(m);
    }
  }
  return result;
};

module.exports = match;
