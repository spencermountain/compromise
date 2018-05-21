'use strict';
const syntaxParse = require('../../../terms/match/lib/syntax');
const Terms = require('../../../terms');

const splitMethods = Text => {
  //support "#Noun word" regex-matches
  const matchReg = function(r, reg, verbose) {
    //parse the 'regex' into some json
    let list = [];
    reg = syntaxParse(reg);
    r.list.forEach(ts => {
      //an array of arrays
      let matches = ts.match(reg, verbose);
      matches.list.forEach(ms => {
        list.push(ms);
      });
    });
    let parent = r.parent || r;
    return new Text(list, r.world(), parent);
  };

  //support {word:true} whitelist
  const matchObj = function(r, obj) {
    let matches = [];
    r.list.forEach(ts => {
      ts.terms.forEach(t => {
        if (obj.hasOwnProperty(t.normal) === true) {
          matches.push(t);
        }
      });
    });
    matches = matches.map(t => {
      return new Terms([t], r.world(), r, t.parentTerms);
    });
    return new Text(matches, r.world(), r.parent);
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

  //take a Text object as a match
  const matchTextObj = function(r, m) {
    let arr = m.out('array'); //i guess this is fine..
    return matchArr(r, arr);
  };

  const methods = {
    /** do a regex-like search through terms and return a subset */
    match: function(reg, verbose) {
      //fail-fast
      if (this.list.length === 0 || reg === undefined || reg === null) {
        let parent = this.parent || this;
        return new Text([], this.world(), parent);
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
        if (reg.isA === 'Text') {
          return matchTextObj(this, reg);
        } else {
          return matchObj(this, reg);
        }
      }
      return this;
    },

    not: function(reg, verbose) {
      let list = [];
      this.list.forEach(ts => {
        let found = ts.not(reg, verbose);
        list = list.concat(found.list);
      });
      let parent = this.parent || this;
      return new Text(list, this.world(), parent);
    },

    if: function(reg) {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].has(reg) === true) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.world(), parent);
    },

    ifNo: function(reg) {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].has(reg) === false) {
          list.push(this.list[i]);
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.world(), parent);
    },

    has: function(reg) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].has(reg) === true) {
          return true;
        }
      }
      return false;
    },

    /**find a match, and return everything infront of it*/
    before: function(reg) {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        let m = this.list[i].matchOne(reg);
        if (m) {
          let index = m[0].index();
          let found = this.list[i].slice(0, index);
          if (found.length > 0) {
            list.push(found);
          }
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.world(), parent);
    },

    /**find a match, and return everything after of it*/
    after: function(reg) {
      let list = [];
      for (let i = 0; i < this.list.length; i++) {
        let m = this.list[i].matchOne(reg);
        if (m) {
          let lastTerm = m[m.length - 1];
          let index = lastTerm.index();
          let found = this.list[i].slice(index + 1, this.list[i].length);
          if (found.length > 0) {
            list.push(found);
          }
        }
      }
      let parent = this.parent || this;
      return new Text(list, this.world(), parent);
    }
  };
  //alias 'and'
  methods.and = methods.match;
  methods.notIf = methods.ifNo;
  methods.only = methods.if;
  methods.onlyIf = methods.if;

  //hook them into result.proto
  Text.addMethods(Text, methods);
  return Text;
};

module.exports = splitMethods;
