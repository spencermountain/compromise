'use strict';
//
const syntax = require('./syntax');
const log = require('./paths').log;
const startHere = require('./startHere');
const path = 'match';

const matchMethods = (Terms) => {
  const methods = {
    //main event
    match: function(str, verbose) {
      if (verbose) {
        log.here(path);
      }
      let matches = [];
      //fail fast
      if (!str) {
        return matches;
      }
      let regs = syntax(str);
      if (verbose) {
        log.tell(regs);
      }
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs);
        if (m) {
          matches.push(m);
          //ok, don't try to match these again.
          let skip = m.length - 1;
          t += skip; //this could use some work
        }
      }
      matches = matches.map((a) => {
        return new Terms(a)
      })
      return matches;
    }
  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;
