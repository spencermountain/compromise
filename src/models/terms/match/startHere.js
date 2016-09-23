'use strict';
const fullMatch = require('./fullMatch');
const lumpMatch = require('./lumpMatch');

// match everything until this point - '*'
const greedyUntil = (terms, i, reg) => {
  for(i = i; i < terms.length; i++) {
    if (fullMatch(terms.get(i), reg)) {
      return i;
    }
  }
  return null;
};

//keep matching this reg as long as possible
const greedyOf = (terms, i, reg) => {
  for(i = i; i < terms.length; i++) {
    if (!fullMatch(terms.get(i), reg)) {
      return i;
    }
  }
  return i;
};

//try and match all regs, starting at this term
const startHere = (ts, startAt, regs) => {
  let term_i = startAt;
  //check each regex-thing
  for(let reg_i = 0; reg_i < regs.length; reg_i++) {
    let term = ts.get(term_i);
    let reg = regs[reg_i];
    if (!term) {
      //we didn't need it anyways
      if (reg.optional) {
        continue;
      }
      // console.log(chalk.red('   -dead-end '));
      return null;
    }
    //catch '^' errors
    if (reg.starting && term_i > 0) {
      return null;
    }
    //catch '$' errors
    if (reg.ending && term_i !== ts.length - 1 && !reg.minMax) {
      return null;
    }
    //support '*' and '{1,3}'
    if (regs[reg_i].greedy || regs[reg_i].minMax) {
      let next_reg = regs[reg_i + 1];
      //if it's at the last reg, easy- just return rest of sentence
      if (!next_reg) {
        let len = ts.length;
        //..or the maximum allowed
        if (regs[reg_i].minMax) {
          let max = regs[reg_i].minMax.max + startAt;
          //this case is a little tricky
          if (regs[reg_i].ending && max < len) {
            return null;
          }
          if (max < len) {
            len = max;
          }
        }
        return ts.terms.slice(startAt, len);
      }
      //otherwise, match until this next thing
      if (next_reg) {
        let foundAt = greedyUntil(ts, term_i, next_reg);
        //didn't find it
        if (!foundAt) {
          return null;
        }
        //if it's too close/far in min/max
        if (regs[reg_i].minMax) {
          let minMax = regs[reg_i].minMax;
          if (foundAt < minMax.min || foundAt > minMax.max) {
            return null;
          }
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
      //try to greedy-match '+'
      if (reg.consecutive) {
        term_i = greedyOf(ts, term_i, reg);
      }
      // let soFar = ts.terms.slice(startAt, term_i).plaintext();
      // log.tell(soFar + '..', path);
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
  return ts.terms.slice(startAt, term_i);
};

module.exports = startHere;
