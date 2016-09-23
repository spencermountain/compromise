'use strict';
//
const syntax = require('./syntax');
const log = require('../paths').log;
const startHere = require('./startHere');
const path = 'match';

//main event
const match = function(ts, str, quiet) {
  if (!quiet) {
    log.here(path);
  }
  let matches = [];
  //fail fast
  if (!str || !ts) {
    return matches;
  }
  let regs = syntax(str);
  if (!quiet) {
    log.tell(regs);
  }
  for(let t = 0; t < ts.terms.length; t++) {
    //don't loop through if '^'
    if (regs[0] && regs[0].starting && t > 0) {
      break;
    }
    let m = startHere(ts, t, regs);
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
