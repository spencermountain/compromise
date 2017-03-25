'use strict';
//
const syntax = require('./lib/syntax');
const startHere = require('./lib/startHere');
const Text = require('../../result/index');
// const diff = require('./diff');

const matchMethods = (Terms) => {

  const methods = {

    //support regex-like whitelist-match
    match: function (reg, verbose) {
      //fail-fast
      if (!reg) {
        return new Text([], this.lexicon, this.parent);
      }
      if (typeof reg === 'string') {
        reg = syntax(reg);
      }
      if (verbose) {
        console.log(reg);
      }
      let matches = [];
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (reg[0] && reg[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, reg, verbose);
        if (m) {
          matches.push(m);
          //ok, don't try to match these again.
          let skip = m.length - 1;
          t += skip; //this could use some work
        }
      }
      matches = matches.map((a) => {
        return new Terms(a, this.lexicon, this.refText, this.refTerms);
      });
      return new Text(matches, this.lexicon, this.parent);
    },

    /**return first match */
    matchOne: function (str) {
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
    has: function (str) {
      let m = this.matchOne(str);
      return !!m;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;
