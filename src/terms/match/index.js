'use strict';
//
const syntax = require('./lib/syntax');
const startHere = require('./lib/startHere');
const Text = require('../../result/index');


const matchMethods = (Terms) => {
  const methods = {

    /**match all */
    match: function (str, verbose) {
      let matches = [];
      let regs = syntax(str);
      for (let t = 0; t < this.terms.length; t++) {
        //don't loop through if '^'
        if (regs[0] && regs[0].starting && t > 0) {
          break;
        }
        let m = startHere(this, t, regs, verbose);
        if (m) {
          matches.push(m);
          //ok, don't try to match these again.
          let skip = m.length - 1;
          t += skip; //this could use some work
        }
      }
      matches = matches.map((a) => {
        return new Terms(a, this.lexicon, this.parent, this.parentTerms);
      });
      // return matches
      let r = new Text(matches, this.lexicon, this.parent);
      return r;
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
    },

    /**everything but these matches*/
    not: function (str, verbose) {
      let matches = [];
      let regs = syntax(str);
      let terms = [];
      //try the match starting from each term
      for(let i = 0; i < this.terms.length; i++) {
        let bad = startHere(this, i, regs, verbose);
        if (bad) {
          //reset matches
          if (terms.length > 0) {
            matches.push(terms);
            terms = [];
          }
          //skip these terms now
          i += bad.length - 1;
          continue;
        }
        terms.push(this.terms[i]);
      }
      //remaining ones
      if (terms.length > 0) {
        matches.push(terms);
      }
      matches = matches.map((a) => {
        return new Terms(a, this.lexicon, this.parent, this.parentTerms);
      });
      // return matches
      let r = new Text(matches, this.lexicon, this.parent);
      return r;
    }

  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;
