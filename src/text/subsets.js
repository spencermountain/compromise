'use strict';
const isQuestion = require('../subset/sentences/isQuestion');
const addSubsets = Text => {
  //these subsets have no instance methods, so are simply a 'find' method.
  const subsets = {
    clauses: function(n) {
      let r = this.splitAfter('#ClauseEnd');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    hashTags: function(n) {
      let r = this.match('#HashTag').terms();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    organizations: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Organization+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    phoneNumbers: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#PhoneNumber+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    places: function(n) {
      let r = this.splitAfter('#Comma');
      r = r.match('#Place+');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    quotations: function(n) {
      const quotes = [
        ['StraightDoubleQuotes', '\u0022', '\u0022'],
        ['StraightDoubleQuotesWide', '\uFF02', '\uFF02'],
        ['StraightSingleQuotes', '\u0027', '\u0027'],
        ['CommaDoubleQuotes', '\u201C', '\u201D'],
        ['CommaSingleQuotes', '\u2018', '\u2019'],
        ['CurlyDoubleQuotesReversed', '\u201F', '\u201D'],
        ['CurlySingleQuotesReversed', '\u201B', '\u2019'],
        ['LowCurlyDoubleQuotes', '\u201E', '\u201D'],
        ['LowCurlyDoubleQuotesReversed', '\u2E42', '\u201D'],
        ['LowCurlySingleQuotes', '\u201A', '\u2019'],
        ['AngleDoubleQuotes', '\u00AB', '\u00BB'],
        ['AngleSingleQuotes', '\u2039', '\u203A'],
        ['PrimeSingleQuotes', '\u2035', '\u2032'],
        ['PrimeDoubleQuotes', '\u2036', '\u2033'],
        ['PrimeTripleQuotes', '\u2037', '\u2034'],
        ['PrimeDoubleQuotes', '\u301D', '\u301E'],
        ['PrimeSingleQuotes', '\u0060', '\u00B4'],
        ['LowPrimeDoubleQuotesReversed', '\u301F', '\u301E']
      ];
      let that = null;
      quotes.forEach(quote => {
        const str = '[/.' + quote[1] + '[^' + quote[1] + ']*$/] /^[^' + quote[2] + ']*' + quote[2] + './';
        const match = this
          .match('#' + quote[0] + '+')
          .splitAfter(str);
        that = that === null ? match : that.concat(match);
      });
      that = that.sort('chronological');
      if (typeof n === 'number') {
        that = that.get(n);
      }
      return that;
    },
    topics: function(n) {
      let r = this.clauses();
      // Find people, places, and organizations
      let yup = r.people();
      yup.concat(r.places());
      yup.concat(r.organizations());
      let ignore = ['someone', 'man', 'woman', 'mother', 'brother', 'sister', 'father'];
      yup = yup.not(ignore);
      //return them to normal ordering
      yup.sort('chronological');
      // yup.unique() //? not sure
      if (typeof n === 'number') {
        yup = yup.get(n);
      }
      return yup;
    },
    urls: function(n) {
      let r = this.match('#Url');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
    questions: function(n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts));
      return new Text(list, this.world, this.parent);
    },
    statements: function(n) {
      let r = this.all();
      if (typeof n === 'number') {
        r = r.get(n);
      }
      let list = r.list.filter(ts => isQuestion(ts) === false);
      return new Text(list, this.world, this.parent);
    },
    parentheses: function(n) {
      let r = this.match('#Parentheses+');
      //split-up consecutive ones
      r = r.splitAfter('#EndBracket');
      if (typeof n === 'number') {
        r = r.get(n);
      }
      return r;
    },
  };

  Object.keys(subsets).forEach(k => {
    Text.prototype[k] = subsets[k];
  });
  return Text;
};
module.exports = addSubsets;
