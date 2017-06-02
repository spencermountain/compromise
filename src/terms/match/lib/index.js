'use strict';
const syntax = require('./syntax');
const startHere = require('./startHere');
const fastPass = require('./fastPass');

//make a reg syntax from a text object
const findFromTerms = function(ts) {
  let arr = ts.terms.map(t => {
    return {
      id: t.uid
    };
  });
  return arr;
};
//
const match = (ts, reg, verbose) => {
  //parse for backwards-compatibility
  if (typeof reg === 'string') {
    reg = syntax(reg);
  } else if (reg && reg.isA === 'Text') {
    reg = findFromTerms(reg.list[0]);
  } else if (reg && reg.isA === 'Terms') {
    reg = findFromTerms(reg);
  }
  if (!reg || reg.length === 0) {
    return [];
  }
  //do a fast-pass for easy negatives
  if (fastPass(ts, reg, verbose) === true) {
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
      //this can cause a inf-loop!
      if (skip < 0) {
        skip = 0;
      }
      t += skip; //this could use some work
    }
  }
  return matches;
};
module.exports = match;
