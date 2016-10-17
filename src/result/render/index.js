'use strict';
const chalk = require('chalk');

const prettyPrint = (Result) => {

  const methods = {

    check : function() {
      console.log('====');
      this.list.forEach((ts) => {
        console.log('   --');
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
        let last = ts.last();
        if (last && last.sel) {
          let punct = last.endPunctuation();
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

    asArray: function() {
      return this.list.map((ts) => {
        return ts.normal();
      });
    },

  };
  Object.keys(methods).forEach((k) => {
    Result.prototype[k] = methods[k];
  });
  return Result;
};

module.exports = prettyPrint;
