'use strict';
const syntax = require('./lib/syntax');
const startHere = require('./lib/startHere');
const Text = require('../../text');
const match = require('./lib');

const matchMethods = Terms => {
  const methods = {
    //support regex-like whitelist-match
    match: function(reg, verbose) {
      //fail-fast #1
      if (this.terms.length === 0) {
        return new Text([], this.world, this.parent);
      }
      //fail-fast #2
      if (!reg) {
        return new Text([], this.world, this.parent);
      }
      let matches = match(this, reg, verbose);
      matches = matches.map(a => {
        return new Terms(a, this.world, this.refText, this.refTerms);
      });
      return new Text(matches, this.world, this.parent);
    },

    /**return first match */
    matchOne: function(str) {
      //fail-fast
      if (this.terms.length === 0) {
        return null;
      }
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs);
        if (m) {
          return m;
        }
      }
      return null;
    },

    /**return first match */
    has: function(str) {
      return this.matchOne(str) !== null;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach(k => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;
