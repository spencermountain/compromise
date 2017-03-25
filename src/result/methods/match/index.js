'use strict';
const syntaxParse = require('../../../terms/match/lib/syntax');
const Terms = require('../../../terms/index');

const splitMethods = (Text) => {

  //support "#Noun word" regex-matches
  const matchReg = function(r, reg, verbose) {
    //parse the 'regex' into some json
    reg = syntaxParse(reg);
    let list = [];
    r.list.forEach((ts) => {
      //an array of arrays
      let matches = ts.match(reg, verbose);
      matches.list.forEach((ms) => {
        list.push(ms);
      });
    });
    let parent = r.parent || r;
    return new Text(list, r.lexicon, parent);
  };

  //support {word:true} whitelist
  const matchObj = function(r, obj) {
    let matches = [];
    r.list.forEach((ts) => {
      ts.terms.forEach((t) => {
        if (obj[t.normal]) {
          matches.push(t);
        }
      });
    });
    matches = matches.map((t) => {
      return new Terms([t], r.lexicon, r, t.parentTerms);
    });
    return new Text(matches, r.lexicon, r.parent);
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

  const methods = {

    /** do a regex-like search through terms and return a subset */
    match: function (reg, verbose) {
      //fail-fast
      if (!reg) {
        let parent = this.parent || this;
        return new Text([], this.lexicon, parent);
      }

      //match "#Noun word" regex
      if (typeof reg === 'string' || typeof reg === 'number') {
        return matchReg(this, reg, verbose);
      }
      //match [word, word] whitelist
      let type = Object.prototype.toString.call(reg);
      if (type === '[object Array]') {
        return matchArr(this, reg);
      }
      //match {word:true} whitelist
      if (type === '[object Object]') {
        return matchObj(this, reg);
      }
      return this;
    },

    not: function(reg, verbose) {
      let list = [];
      this.list.forEach((ts) => {
        let found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    if: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    },

    ifNo: function (reg, verbose) {
      let list = [];
      for(let i = 0; i < this.list.length; i++) {
        let m = this.list[i].match(reg, verbose);
        if (!m.found) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.lexicon, parent);
    }

  };
  //alias 'and'
  methods.and = methods.match;

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = splitMethods;
