'use strict';
//
const syntax = require('./lib/syntax');
const startHere = require('./lib/startHere');
const Text = require('../../result/index');
// const diff = require('./diff');



const matchMethods = (Terms) => {

  //support {word:true} whitelist
  const matchObj = function(ts, obj) {
    let matches = ts.terms.filter((t) => obj[t.normal]);
    matches = matches.map((a) => {
      return new Terms([a], ts.lexicon, ts.refText, ts.refTerms);
    });
    return new Text(matches, ts.lexicon, ts.parent);
  };

  //support [word, word] whitelist
  const matchArr = function(r, arr) {
    //its faster this way
    let obj = arr.reduce((h, a) => {
      h[a] = true;
      return h;
    }, {});
    return matchObj(r, obj);
  };

  //support regex-like whitelist-match
  const matchString = function(r, str, verbose) {
    let matches = [];
    let regs = syntax(str);
    for (let t = 0; t < r.terms.length; t++) {
      //don't loop through if '^'
      if (regs[0] && regs[0].starting && t > 0) {
        break;
      }
      let m = startHere(r, t, regs, verbose);
      if (m) {
        matches.push(m);
        //ok, don't try to match these again.
        let skip = m.length - 1;
        t += skip; //this could use some work
      }
    }
    matches = matches.map((a) => {
      return new Terms(a, r.lexicon, r.refText, r.refTerms);
    });
    return new Text(matches, r.lexicon, r.parent);
  };

  const methods = {

    /**match all */
    match: function (want, verbose) {
      //support regex-like whitelist-match
      if (typeof want === 'string') {
        return matchString(this, want, verbose);
      }
      if (typeof want === 'object') {
        let type = Object.prototype.toString.call(want);
        //support [word, word] whitelist
        if (type === '[object Array]') {
          return matchArr(this, want, verbose);
        }
        //support {word:true} whitelist
        if (type === '[object Object]') {
          return matchObj(this, want, verbose);
        }
      }
      return this;
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
