'use strict';
const fns = require('../fns.js');

//a regex-like string search
// returns a boolean for match/not
const match_term = function(term, reg) {
  //fail-fast
  if (!term || !reg || !reg.signals) {
    return false;
  }
  let signals = reg.signals;

  //support optional (foo|bar) syntax
  if (signals.one_of) {
    let arr = reg.term.split('|');
    for(let i = 0; i < arr.length; i++) {
      if (arr[i] === term.normal || arr[i] === term.text) {
        return true;
      }
    }
    return false;
  }
  //support [Pos] syntax
  if (signals.pos) {
    let pos = fns.titlecase(reg.term);
    if (term.pos[pos]) {
      return true;
    }
    return false;
  }
  //support ~alias~ syntax
  if (signals.alias) {
    if (reg.term === term.root()) {
      return true;
    }
    return false;
  }
  //straight-up text match
  if (reg.term === term.normal || reg.term === term.text || reg.term === term.expansion) {
    return true;
  }

  return false;
};

module.exports = match_term;
