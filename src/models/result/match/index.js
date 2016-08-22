'use strict';
//
const Result = require('./result');
const chalk = require('chalk');
const syntax = require('./syntax');
const log = require('../../log');
const path = 'match';
const fullMatch = require('./fullMatch');
const lumpMatch = require('./lumpMatch');

// match everything until this point - '*'
const greedySkipper = (terms, i, reg) => {
  for(i = i; i < terms.length; i++) {
    if (fullMatch(terms.get(i), reg)) {
      return i;
    }
  }
  return null;
};

//try and match all regs, starting at this term
const startHere = (terms, startAt, regs) => {
  let term_i = startAt;
  //check each regex-thing
  for(let reg_i = 0; reg_i < regs.length; reg_i++) {
    let term = terms.get(term_i);
    let reg = regs[reg_i];
    if (!term) {
      // console.log(chalk.red('   -dead-end '));
      return null;
    }
    //catch '^' errors
    if (reg.starting && term_i > 0) {
      return null;
    }
    //catch '$' errors
    if (reg.ending && term_i !== terms.length - 1) {
      return null;
    }
    //support asterix
    if (regs[reg_i].greedy) {
      let next_reg = regs[reg_i + 1];
      //easy, just return rest of sentence
      if (!next_reg) {
        return terms.slice(startAt, terms.length);
      }
      //otherwise, match until this next thing
      if (next_reg) {
        let foundAt = greedySkipper(terms, term_i, next_reg);
        //didn't find it
        if (!foundAt) {
          return null;
        }
        //continue it further-down place
        term_i = foundAt + 1;
        reg_i += 1;
        continue;
      }
    }
    //check a perfect match
    if (fullMatch(term, reg)) {
      term_i += 1;
      let soFar = terms.slice(startAt, term_i).plaintext();
      log.tell(soFar + '..', path);
      continue;
    }
    //handle partial-matches of lumped terms
    let lumpUntil = lumpMatch(term, regs, reg_i);
    if (lumpUntil) {
      reg_i = lumpUntil;
      term_i += 1;
      continue;
    }
    //skip over silent contraction terms
    if (term.silent_term && !term.normal) {
      //try the next term, but with this regex again
      term_i += 1;
      reg_i -= 1;
      continue;
    }
    //was it optional anways?
    if (reg.optional) {
      continue;
    }
    // console.log(chalk.red('   -dead: ' + terms.get(term_i).normal));
    return null;
  }
  return terms.slice(startAt, term_i);
};


//main event
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
    //don't loop through if '^'
    if (regs[0] && regs[0].starting && t > 0) {
      break;
    }
    let m = startHere(terms, t, regs);
    if (m) {
      result.matches.push(m);
    }
  }
  return result;
};

module.exports = match;
