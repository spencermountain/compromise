'use strict';
//
const syntax = require('./lib/syntax');
const log = require('./lib/paths').log;
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
          return new Terms(a, this.lexicon, this.parent, this)
        })
        // return matches
      let r = new Text(matches, this.lexicon, this.parent);
      return r
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
          return m
        }
      }
      return null
    },

    /**return first match */
    has: function (str) {
      let m = this.matchOne(str)
      return !!m
    }

  }

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Terms.prototype[k] = methods[k];
  });
  return Terms;
};

module.exports = matchMethods;;;
