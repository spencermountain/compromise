'use strict';
const chalk = require('chalk');

const prettyPrint = (Text) => {

  const methods = {

    check: function () {
      console.log('====');
      this.list.forEach((ts) => {
        console.log('   --');
        ts.check()
      });
      return this;
    },

    plaintext: function () {
      return this.list.reduce((str, ts) => {
        str += ts.plaintext();
        return str;
      }, '');
    },

    normal: function () {
      return this.list.map((ts) => {
        let str = ts.normal();
        let last = ts.last();
        if (last) {
          let punct = last.endPunctuation();
          if (punct === '.' || punct === '!' || punct === '?') {
            str += punct;
          }
        }
        return str;
      }).join(' ');
    },

    phrases: function () {
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

    asArray: function () {
      return this.list.map((ts) => ts.normal());
    },

    asHtml: function () {
      let html = this.terms.reduce((str, t) => {
        str += t.render.html();
        return str;
      }, '');
      return '<span>' + html + '</span>';
    },

  };
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = prettyPrint;
