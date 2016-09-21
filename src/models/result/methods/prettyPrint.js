'use strict';
const chalk = require('chalk');

const prettyPrint = (Result) => {

  const methods = {

    check : function() {
      this.list.forEach((ts, i) => {
        console.log('--');
        ts.check();
      });
      return this;
    },

    plaintext : function() {
      return this.list.reduce((str, ts) => {
        str += ts.plaintext();
        return str;
      }, '');
    },

    normal: function() {
      return this.list.map((ts) => {
        let str = ts.normal();
        if (ts.last()) {
          let punct = ts.last().endPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      }).join(' ');
    },

    phrases: function() {
      this.list.forEach((ts) => {
        let str = '';
        ts.terms.forEach((t) => {
          let text = t.plaintext();
          if (t.tag.ConditionPhrase) {
            str += chalk.magenta(text);
            return;
          }
          if (t.tag.NounPhrase) {
            str += chalk.cyan(text);
            return;
          }
          if (t.tag.VerbPhrase) {
            str += chalk.red(text);
            return;
          }
          if (t.tag.AdjectivePhrase) {
            str += chalk.green(text);
            return;
          }
          str += text;
        });
        console.log('\n' + str);
      });
    },
  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = prettyPrint;
